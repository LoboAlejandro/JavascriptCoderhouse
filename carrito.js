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
        index=0;
        listaCarrito.forEach(element =>{
            if(dato.id == element.id){
                editarItemCarrito(index, element, cantidad);
            }
            index++;
        })
    }
}

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
    contadorItemsCarrito();
}

function contadorItemsCarrito(){
    let contador= 0;
    for (const data of listaCarrito){
        let contadorCopia= parseInt(data.cantidad);
        contador= parseInt(contador) + contadorCopia;
    }
    contadorHtmlCarrito(contador);
}

function contadorHtmlCarrito(contador){
    $('.header__nav__carrito').append(`<p class="contadorHtml"></p>`);
    $('.contadorHtml').remove();

    $('.header__nav__carrito').append(`<p class="contadorHtml"><b>${contador}</b></p>`);
    $('.contadorHtml').hide();
    $('.contadorHtml').fadeIn(200);
}

function construirCarrito(){
    $('.divs').append('<div class="divCarrito"></div>');
    $('.divCarrito').remove();
    
    $('.divs').append('<div class="divCarrito"><h2 class="errorListaCarrito">No hay productos agregados al carrito.</h2></div>');
    $('.divCarrito').append('<div class="divCarritoProductos"></div>');
    $('.divCarrito').show();
    
    $('.divCarrito').append('<div class="textoTotal"></div>');
    $('.divCarrito').append('<div class="divBotoneraCarrito"><button class="btnLimpiarCarrito">Limpiar Carrito</button><button class="btnCerrarCarrito">Cerrar carrito</button><button class="btnComprarCarrito">Comprar</button></div>');
    let habilitarCompra= document.querySelector('.btnComprarCarrito');
    let deshabilitarTotal= false;
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

    if(deshabilitarTotal== true){
        totalProductosCarrito= 0;
    }else{
        let iva= totalProductosCarrito * 0.21;
        let TOTAL= (iva + totalProductosCarrito);
        $('.textoTotal').append(`<h4>Total: $${totalProductosCarrito}<h4>`);
        $('.textoTotal').append(`<p>+ IVA 21%: $${iva.toFixed(2)}</p>`);
        $('.textoTotal').append(`<h2 class="TOTAL">TOTAL: $${TOTAL.toFixed(2)}</h2>`);
    }

    $('.btnCerrarCarrito').click((e) =>{
        e.preventDefault();
        $('.divCarrito').hide();
    });
}

function generarCarritoHtml(data){
    $('.divCarritoProductos').append(`<div class="listaCarrito listaCarrito--${data.id}"></div>`);
    $(`.listaCarrito--${data.id}`).append(
        `<img class="imagenListaCarrito" src="${data.imagen}"><img>
        <h2>${data.nombre}</h2>
        <h3>Cantidad: ${data.cantidad}</h3>`
        );
    const precioOferta= data.precio - ((data.oferta * data.precio)/ 100);
    let productoTotal= 0;
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