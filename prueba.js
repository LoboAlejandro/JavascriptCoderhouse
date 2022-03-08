$(`.listaCarrito--${data.id}`).append(`<button class="eliminarCarrito--${data.id}">X</button>`)
    totalProductosCarrito= totalProductosCarrito + productoTotal;
    $(`.eliminarCarrito--${data.id}`).click((e) =>{
        e.preventDefault();
        $(`.listaCarrito--${data.id}`).remove();
        listaCarrito.splice(contListaCarrito -1 ,1);
        contListaCarrito= 0;
    });
    contListaCarrito++;