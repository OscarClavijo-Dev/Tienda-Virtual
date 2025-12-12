let productos = []

const producto = {
    id: 1,
    nombre: 'Camisa negra',
    categoria: 'Ropa Masculina',
    cantidad: 20,
    precio: 50000
}

let categorias = [
    'Ropa Interior',
    'Ropa Masculina',
    'Ropa Femenina',
    'Ropa de Bebe',
    'Accesorios'
]

productos.push(producto)

const buscador = document.querySelector('#buscador')
const listaProductos = document.querySelector('#lista-productos tbody')
const formularioRegistrarProducto = document.querySelector('#formulario-registrar-producto')
const modalRegistrarProducto = document.querySelector('#modal-registrar-producto')
const selectCategoria = document.querySelector('#categoria')

//evento de carga

document.addEventListener('DOMContentLoaded', () => {
    listarCategorias()
    listarProductos()
})

// Función registrar producto

formularioRegistrarProducto.addEventListener('submit', (e) => {

    e.preventDefault()

    const datos = new FormData(formularioRegistrarProducto)

    const producto = {
        id: Date.now(),
        nombre: datos.get('nombre'),
        categoria:  datos.get('categoria'),
        cantidad:  datos.get('cantidad'),
        precio:  datos.get('precio')
    }

    productos.push(producto)

    const modal = bootstrap.Modal.getInstance(modalRegistrarProducto)
    if (modal){
         modal.hide()
    }

    listarProductos()
   formularioRegistrarProducto.reset();

   Swal.fire({
            title: "Registro Exitoso",
            text: "Producto registrado Correctamente!.",
            icon: "success"
            });
})

//Funcion de filtrar

buscador.addEventListener('keyup', () => {

    const texto = buscador.value.toLowerCase()
    const trs = listaProductos.querySelectorAll('tr')

    trs.forEach(tr => {
        
        const tds = Array.from(tr.querySelectorAll('td'))

        const display  = tds.some(td => td.textContent.toLowerCase().includes(texto))

        tr.classList.toggle('d-none', !display)
    })
})

//Evento capturar accion Eliminar

listaProductos.addEventListener('click', (e) => {

    
    if (e.target.classList.contains('eliminar-producto')) {
        eliminarProducto(e)
     }
})

//Funcion eliminar producto

const eliminarProducto = (e) => {

    e.preventDefault()

    const productoEliminar = e.target.dataset.producto

    Swal.fire({
        title: "¿Desea eliminar el producto?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar"
    }).then((result) => {
        if (result.isConfirmed) {

            productos = productos.filter(producto => producto.id != productoEliminar)
            listarProductos()

            Swal.fire({
            title: "Eliminado!",
            text: "Producto Eliminado Correctamente!.",
            icon: "success"
            });
}
});

    

}

// FUncion para listar los productos

const listarProductos = () => {
    listaProductos.innerHTML = ''

    productos.forEach(producto => {

        const tr = document.createElement('tr')
        tr.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.categoria}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.precio}</td>
            <td>
            <i class="bi bi-trash text-danger eliminar-producto" data-producto="${producto.id}"></i>
            </td>
        `
        listaProductos.appendChild(tr)
    })
}
//Renderizar las categorias

const listarCategorias = () => {

    categorias.forEach(categoria => {

        const option = document.createElement('option')

        option.value = categoria
        option.innerText = categoria

        selectCategoria.appendChild(option)

    } )


}