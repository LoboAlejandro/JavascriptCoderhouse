//Funcion para inicializar la validación de edad
const alerta = () =>{
    //Genero el html para la validacion principal
    $('body').prepend(`<div class="divPrincipal"></div>`);
    $('.divPrincipal').append(`<div class="divHijo"></div>`);
    $('.divHijo').append(`<h2>¿Eres mayor de edad?</h2>`);
    $('.divHijo').append(`<h3 class="advertencia" style="display:none;">Para continuar se requiere que seas mayor de edad.</h3>`);
    $('.divHijo').append(`<div class="divBoton" ></div>`);
    $('.divBoton').append(`<button class="boton">No</button>`);
    $('.divBoton').append(`<button class="boton2">Si</button>`);
    //Evento para la respuesta "no"
    $('.boton').click(() => {
        $('.advertencia').show();
        $('.advertencia').delay(2000);
        $('.advertencia').fadeOut();
    })
    //Evento para la respuesta "si"
    $('.boton2').click(() =>{
        $('.divPrincipal').fadeOut();
        $('.header, .main, .footer').show();
    })
}

//Funcion para generar html en base a datos recibidos de otras funciones.
function generarHtml(dato){
    const listado = document.querySelector(".main__productos");
    const article= document.createElement('article');
    const producto= document.createElement('h2');
    const posicion= document.createElement('p');
    const imagen= document.createElement('img');
    const stock= document.createElement('p');
    const cant= document.createElement('label');
    const btnComprar= document.createElement('button');
    //Declaro contenido de las variables
    //Guardo el producto por id
    article.className= `product-item--${dato.id}`;
    producto.textContent= `${dato.nombre}`;
    posicion.textContent= `ID: ${dato.id}`;
    imagen.className= 'imagen';
    imagen.src= dato.imagen;
    stock.className= 'textoStock';
    btnComprar.className= `btnComprar btnComprar--${dato.id}`;
    btnComprar.textContent= 'Agregar al Carrito';
    //Genero las etiquetas ya definidas en html
    listado.appendChild(article);
    article.appendChild(producto);
    article.appendChild(imagen);
    article.appendChild(posicion);

    //Hago la cuenta, con el precio ingresado y el porcentaje, y el resultado es el precio final con descuento incluido
    const precioOferta= dato.precio - ((dato.oferta * dato.precio)/ 100);

    //Si la oferta es 0, muestra el precio regular, si es diferente, muestra precio regular y tambien la nueva oferta
    if(dato.oferta == 0){
        const precio= document.createElement('h3');
        precio.textContent= `Precio: $${dato.precio}`;
        article.appendChild(precio);
    }else{
        const precio= document.createElement('h5');
        const oferta= document.createElement('h3');
        const cartelOferta= document.createElement('h3');
        precio.className= "precio--antes";
        precio.textContent= `Antes: $${dato.precio}`;
        oferta.textContent= `Precio: $${precioOferta}`;
        cartelOferta.className= 'cartelOferta';
        cartelOferta.textContent= `${dato.oferta}% off`;
        article.appendChild(precio);
        article.appendChild(oferta);
        article.appendChild(cartelOferta);
    }
    
    //Si el stock es menor a 10 muestra la cantidad restante, de otra manera no lo muestra, ademas limita la cantidad a elegir dependiendo del stock
    let cantidadMaxima= 10;
    if(dato.stock <= 10){
        //Si el stock es mayor a 1 y menor o igual que 10 muestra en plural, sino muestra que queda la ultima unidad
        if(dato.stock > 1){
            stock.textContent= `¡Quedan las ultimas ${dato.stock} unidades!`;
        }else{
            stock.textContent= `¡Queda la última unidad!`;
        }
        article.appendChild(stock);
        cantidadMaxima= dato.stock;
    }else{
        cantidadMaxima= 10;
    }
    
    //Si el stock es 0, muestro mensaje sin stock, y establezco la cantidad maxima a elegir o deshabilito la opcion.
    if(dato.stock == 0){
        stock.textContent= `¡Sin Stock!`;
        cant.innerHTML= `Cantidad:<input type="number" disabled class="cantidad cantidad--${dato.id}" placeholder="0" step="1" min="1" max="${cantidadMaxima}" value="0">`;
        btnComprar.disabled= true;
    }else{
        cant.innerHTML= `Cantidad:<input type="number" class="cantidad cantidad--${dato.id}" placeholder="0" step="1" min="1" max="${cantidadMaxima}" required value="1">`;
        btnComprar.disabled= false;
    }
    
    (article).appendChild(cant);
    $(article).append(`<p class="seleccionarCantidad seleccionarCantidad--${dato.id}">Seleccione cantidad</p>`);
    $(article).append(`<p class="errorCantidad errorCantidad--${dato.id}">Cantidad maxima excedida</p>`);
    (article).appendChild(btnComprar);
    //Funcion para enviar informacion sobre la compra en el caso de que este habilitada, envia cuanta cantidad y que producto es.
    $(`.btnComprar--${dato.id}`).click(function (e) {
        e.preventDefault();
        let cantidadCopia= document.querySelector(`.cantidad--${dato.id}`).value;
        let cantidad= parseInt(document.querySelector(`.cantidad--${dato.id}`).value);
        if(cantidadCopia == 0 || cantidadCopia === '' || cantidadCopia === ' '){
            $(`.seleccionarCantidad--${dato.id}`).show();
            cantidad= 0;
        }else{
            $(`.seleccionarCantidad--${dato.id}`).hide();
            if(cantidad > cantidadMaxima){
                cantidad= cantidadMaxima;
                $(`.errorCantidad--${dato.id}`).show();
            }else{
                $('.divCarrito').hide();
                $(`.errorCantidad--${dato.id}`).hide();
                comprobarProductoItem(dato, cantidad);
            }
        }
    })
}

//Función para agregar producto mediante datos ingresados en inputs
const formAgregar= document.querySelector('.agregarProducto');
formAgregar.onsubmit = (event)=>{
    event.preventDefault();
    i++;
    const nombre= document.querySelector('#nombre').value;
    const precio= document.querySelector('#precio').value;
    const stock= document.querySelector('#stock').value;
    //constante generada a partir de datos ingresados
    const product= {
        "id": `${i}`,
        "mayus": `${nombre.toUpperCase()}`,
        "nombre": `${nombre}`,
        "precio": `${precio}`,
        "stock": `${stock}`,
        "oferta": 0,
        "imagen": "https://rockcontent.com/es/wp-content/uploads/sites/3/2019/02/o-que-e-produto-no-mix-de-marketing-1024x538.png"
    };
    //Llamo a la funcion que genera contenido html en base a los datos ingresados.
    generarHtml(product);
    //Guardo la constante en un array
    lista.push(product);
}

//Funcion para modificar un objeto de la lista
const formModificar= document.querySelector('.modificarProducto');
formModificar.onsubmit= (event) => {
    event.preventDefault();
    let posicionModificar= document.querySelector('.posicionModificar').value;
    let nombre= document.querySelector('.modificarNombre').value;
    let precio= document.querySelector('.modificarPrecio').value;
    let stock= document.querySelector('.modificarStock').value;
    let oferta= document.querySelector('.modificarOferta').value;
    index=0;
    //Recorro la lista en busqueda de que el id ingresado en input, coincida con un id en la lista
    lista.forEach(element => {
        if(element.id == posicionModificar){
            //si el input esta vacio, no se modifica el valor del item
            if(nombre == ""){
                nombre= element.nombre;
            }
            if(precio == ""){
                precio= element.precio;
            }
            if(stock == ""){
                stock= element.stock;
            }
            if(oferta == ""){
                oferta=0;
            }
            if(oferta <= 100 && oferta>= 1){
                oferta= oferta;
            }else{
                oferta=0;
            }
            editarItem(index, element.id, nombre, precio, stock, oferta, element.imagen);
        }
        index++
    });

    //Reemplazo el objeto y lo actualizo con nuevos datos
    function editarItem(index, i, nombre, precio, stock, oferta, imagen){
        lista.splice(`${index}`, 1, {
            "id": `${i}`,
            "mayus": `${nombre.toUpperCase()}`,
            "nombre": `${nombre}`,
            "precio": `${precio}`,
            "stock": `${stock}`,
            "oferta": `${oferta}`,
            "imagen": `${imagen}`
        });
    }
}

//Funcion para eliminar producto mediante el id.
const formEliminar= document.querySelector('.eliminarProducto');
formEliminar.onsubmit= (event) =>{
    event.preventDefault();
    const listado= document.querySelector('.main__productos');
    const posicionId= document.querySelector('.posicion').value;
    //Llamo al contenedor con el nombre de la clase + posicion de id ingresado
    const contenedor= document.querySelector(`.product-item--${posicionId}`);
    listado.removeChild(contenedor);
    //Elimino la posicion de la lista
    lista.splice(posicionId -1, 1);
}