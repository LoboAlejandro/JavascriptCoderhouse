$('.buscador').keyup(function (e) { 
    e.preventDefault();
    //Cada vez que se actualiza el input se oculta mensaje de error
    $('.main__productos__error').hide();
    let busqueda= '';
    busqueda= e.target.value;
    //Filtro de busqueda y lo convierto en mayusculas
    const resultadoNombre= lista.filter(element => element.mayus.includes(busqueda.toUpperCase()));
    //Escondo todos los articles que tiene la clase productos
    $('.main__productos article').hide();
    //recorro el resultado del filtro, lo busco mediante clases y muestro las coincidencias
    for(let item of resultadoNombre){
        $(`.product-item--${item.id}`).show();
    };
    //Si no encuentra ningun resultado, se muestra el mensaje de error
    if(resultadoNombre == ''){
        $('.main__productos__error').show();
    }
});

//Funcion para validar si existe el id seleccionado, en caso negativo, muestro mensaje de error y desactivo inputs y boton.
$('.posicionModificar').keyup(function (e) {
    e.preventDefault();
    let coincidencia= '';
    coincidencia= e.target.value;
    let resultadoId= lista.filter(element => element.id.includes(coincidencia));
    let habilitarModificar= document.querySelector('.btnModificar');
    let habilitarModificarNombre= document.querySelector('.modificarNombre');
    let habilitarModificarPrecio= document.querySelector('.modificarPrecio');
    let habilitarModificarStock= document.querySelector('.modificarStock');
    let habilitarModificarOferta= document.querySelector('.modificarOferta');
    if(resultadoId == ''){
        $('.modificarProducto--errorId').show();
        habilitarModificar.disabled= true;
        habilitarModificarNombre.disabled= true;
        habilitarModificarPrecio.disabled= true;
        habilitarModificarStock.disabled= true;
        habilitarModificarOferta.disabled= true;
    }else{
        $('.modificarProducto--errorId').hide();
        habilitarModificar.disabled= false;
        habilitarModificarNombre.disabled= false;
        habilitarModificarPrecio.disabled= false;
        habilitarModificarStock.disabled= false;
        habilitarModificarOferta.disabled= false;
    }
});

//Funcion para validar si existe el id seleccionado y mostrar mensaje de error en caso negativo
$('.posicion').keyup(function (e) {
    e.preventDefault();
    let coincidencia= '';
    coincidencia= e.target.value;
    let resultadoId= lista.filter(element => element.id.includes(coincidencia));
    let habilitarEliminar= document.querySelector('.btnEliminar');
    if(resultadoId == ''){
        $('.eliminarProducto--errorId').show();
        habilitarEliminar.disabled= true;
    }else{
        $('.eliminarProducto--errorId').hide();
        habilitarEliminar.disabled= false;
    }
});

//función para guardar la informacion mediante un boton
$('.guardar').click(function (e) { 
    e.preventDefault();
    //Actualizo la lista del storage
    localStorage.setItem(PRODUCTOS, JSON.stringify(lista))
    //Elimino el HTML de productos generado y lo inicializo con los datos actualizados
    $('.main__productos').remove();
    $('.main').append(`<section class="main__productos"></section>`);
    initLista();
    //Mensaje de guardado exitoso
    $('.advertenciaGuardar').hide();
    $('.mensajeGuardar').show();
    $('.mensajeGuardar').delay(3000);
    $('.mensajeGuardar').fadeOut();
    $('.advertenciaGuardar').delay(3400);
    $('.advertenciaGuardar').fadeIn();
});

//Función para mostrar y ocultar mediante slide el menu del usuario
$('.header__nav__divUsuario').click((e)=> {
    e.preventDefault();
    $('.divCarrito').hide();
    $('.divUsuario__menu').slideToggle();

});

//Función para mostrar el menu cuando se seleccione el "menu administrador"
$('.menu__administrador').click((e)=> {
    e.preventDefault();
    $('.header__menu').slideDown();
});

//Función para cerrar el menu administrador mediante un boton
$('.cerrar').click((e)=>{
    e.preventDefault();
    $('.header__menu').slideUp();
});


let totalProductosCarrito= 0;
$('.carrito--imagen').click((e) =>{
    e.preventDefault();
    construirCarrito();
    
    $('.btnLimpiarCarrito').click((e) => {
        e.preventDefault();
        listaCarrito= [];
        construirCarrito();
        contadorItemsCarrito();
    })
})

//Este boton tenia uso, hasta que decidi poner la funcion "keyUp" de JQuery en el input del buscador
//Evito que al apretar el boton de buscar se recargue la pagina
$('.btnBuscador').click(e => e.preventDefault());