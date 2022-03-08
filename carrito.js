//Al agregar un producto al carrito, comparo si no existe previamente en la lista del carrito mediante el id, si existe le modifico la cantidad de productos, y si no, creo uno nuevo y lo pusheo.
function comprobarProductoItem(dato, cantidad){
    let resultadoId= listaCarrito.filter(element => element.id.includes(dato.id));
    if(resultadoId == ''){
        let productoCarrito= {
            "id": `${dato.id}`,
            "nombre": `${dato.nombre}`,
            "precio": `${dato.precio}`,
            "imagen": `${dato.imagen}`,
            "oferta": `${dato.oferta}`,
            "cantidad": `${cantidad}`
        };
        listaCarrito.push(productoCarrito);
        contadorItemsCarrito();
    }else{
        index= 0;
        listaCarrito.forEach(element =>{
            if(dato.id == element.id){
                //llamo a la funcion para editar el objeto en la lista del carrito.
                editarItemCarrito(index, element, cantidad);
            }
            index++;
        })
    }
}

//Función para editar el objeto en la lista del carrito
function editarItemCarrito(index, dato, cantidad){
    cantidad+= parseInt(dato.cantidad);
    listaCarrito.splice(`${index}`, 1, {
        "id": `${dato.id}`,
        "nombre": `${dato.nombre}`,
        "precio": `${dato.precio}`,
        "imagen": `${dato.imagen}`,
        "oferta": `${dato.oferta}`,
        "cantidad": `${cantidad}`
    })
    //Llamo a la funcion para actualizar el contador rojo del boton del carrito.
    contadorItemsCarrito();
}

//Funcion para contar la cantidad de items agregadas en el carrito segun la lista generada
function contadorItemsCarrito(){
    let contador= 0;
    for (const data of listaCarrito){
        let contadorCopia= parseInt(data.cantidad);
        contador= parseInt(contador) + contadorCopia;
    }
    //llamo a la funcion para generar el html y mostrarlo en pantalla
    contadorHtmlCarrito(contador);
}

//Funcion para mostrar el contador de items agregados en el carrito.
function contadorHtmlCarrito(contador){
    $('.header__nav__carrito').append(`<p class="contadorHtml"></p>`);
    $('.contadorHtml').remove();
    
    $('.header__nav__carrito').append(`<p class="contadorHtml"><b>${contador}</b></p>`);
    $('.contadorHtml').hide();
    $('.contadorHtml').fadeIn(200);
}

//Con esta función genero la estructura del carrito, y también cada vez que se llama a esta función se actualiza.
function construirCarrito(){
    //La creo y la elimino cada vez que se llama a la funcion, para actualizar el contenido
    $('.divs').append('<div class="divCarrito"></div>');
    $('.divCarrito').remove();
    //Genero las etiquetas y clases correspondientes
    $('.divs').append('<div class="divCarrito"><h2 class="errorListaCarrito">No hay productos agregados al carrito.</h2></div>');
    $('.divCarrito').append('<div class="divCarritoProductos"></div>');
    $('.divCarrito').show();
    
    $('.divCarrito').append('<div class="textoTotal"></div>');
    $('.divCarrito').append('<div class="divBotoneraCarrito"><button class="btnLimpiarCarrito">Limpiar Carrito</button><button class="btnCerrarCarrito">Cerrar carrito</button><button class="btnComprarCarrito">Comprar</button></div>');
    let habilitarCompra= document.querySelector('.btnComprarCarrito');
    let deshabilitarTotal= false;
    let iva= 0;
    let TOTAL= 0;
    totalProductosCarrito= 0;
    //Si la lista esta vacía, mostrar el mensaje de error lista vacia, sino ocultar mensaje de error y general la lista de items del carrito.
    if(listaCarrito.length == 0){
        $('.errorListaCarrito').show();
        habilitarCompra.disabled= true;
        deshabilitarTotal= true;
    }else{
        $('.errorListaCarrito').hide();
        habilitarCompra.disabled= false;
        deshabilitarTotal= false;
        for(const data of listaCarrito){
            generarCarritoHtml(data);
        }
    }
    //Si la lista está vacia, declaro que el precio total de productos sea 0 y no se muestre, sino calcular IVA, TOTAL y mostrar el resultado
    if(deshabilitarTotal== true){
        totalProductosCarrito= 0;
        iva= 0;
        TOTAL= 0;
    }else{
        iva= totalProductosCarrito * 0.21;
        TOTAL= (iva + totalProductosCarrito);
        $('.textoTotal').append(`<h4>Total: ARS $${totalProductosCarrito}<h4>`);
        $('.textoTotal').append(`<p>+ IVA 21%: ARS $${iva.toFixed(2)}</p>`);
        $('.textoTotal').append(`<h2 class="TOTAL">TOTAL: ARS $${TOTAL.toFixed(2)}</h2>`);
    }
    //Botón para cerrar carrito
    $('.btnCerrarCarrito').click((e) =>{
        e.preventDefault();
        $('.divCarrito').hide();
    });
}

//Funcion para generar la lista de cada producto en el carrito.
function generarCarritoHtml(data){
    $('.divCarritoProductos').append(`<div class="listaCarrito listaCarrito--${data.id}"></div>`);
    $(`.listaCarrito--${data.id}`).append(
        `<img class="imagenListaCarrito" src="${data.imagen}">
        <h2>${data.nombre}</h2>
        <h3>Cantidad: ${data.cantidad}</h3>`
        );
    const precioOferta= data.precio - ((data.oferta * data.precio)/ 100);
    let productoTotal= 0;
    //Si el producto no tiene oferta, mostrar precio y total, sino, mostrar precio anterior, nuevo precio y total
    if(data.oferta == 0){
        productoTotal= data.cantidad * data.precio;
        $(`.listaCarrito--${data.id}`).append(`<h3>Precio: $${data.precio} c/u</h3>`)
        $(`.listaCarrito--${data.id}`).append(`<h2>Total: $${productoTotal}</h3>`);
    }else{
        productoTotal= data.cantidad * precioOferta;
        $(`.listaCarrito--${data.id}`).append(
            `<div>
                <h5 class="precio--antes"><s>Antes: $${data.precio}</s></h5>
                <h3>Precio: $${precioOferta} c/u</h3>
                </div>`
            );
        $(`.listaCarrito--${data.id}`).append(`<h2>Total: $${productoTotal}</h3>`);
    }
    totalProductosCarrito= totalProductosCarrito + productoTotal;
}