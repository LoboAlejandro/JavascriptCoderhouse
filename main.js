//Declaro la constante productos para luego compararla
const PRODUCTOS= 'productos';

//Declaro que los elementos del body arranquen el programa escondidos
$('.header__menu, .header, .main, .footer').hide();
$('.divCarrito').hide();

$(document).ready(() =>{
    //llamo a función para validar edad.
    alerta();
    //llamo a la funcion para leer el .json y luego recorrer los datos
    getInicio();
});

//Creo esta funcion para luego llamarla al limpiar el localstorage
function getInicio(){
    //llamo al archivo .json y si se cumple, envia la variable a la funcion para recorrer los datos
    $.get("data.json",function (respuesta, estado) {
        if(estado === "success"){
            //llamo a funcion para recorrer el json
            jsonReader(respuesta);
        }
    });
}

//Genero una lista para guardar datos y luego leerla
this.lista= [];
this.listaCarrito= [];

//funcion para recorrer los datos del json
function jsonReader(respuesta){
    //inicializo el contador en 0
    i=0;
    for (const dato of respuesta){
        //Incremento contador del ID
        i++;
        //Genero una constante por cada recorrido que haga del json
        const product= {
            "id": `${i}`,
            "mayus": `${dato.mayus}`,
            "nombre": `${dato.nombre}`,
            "precio": `${dato.precio}`,
            "stock": `${dato.stock}`,
            "imagen": `${dato.imagen}`,
            "oferta": `${dato.oferta}`
        };
        //Agrego la constante a una lista para luego poder leer 
        lista.push(product);
    }
    initLista();
}

//funcion para inicializar el programa
function initLista(){
    //Comparo datos que hay en el localStorage, si es null o undefined, cargo la lista que tengo hasta el momento, sino, cargo los datos que estén dentro del localStorage.
    tempLista= JSON.parse(localStorage.getItem(PRODUCTOS));
    if(tempLista == null || tempLista == undefined){
        localStorage.setItem(PRODUCTOS, JSON.stringify(lista));
    }else{
        lista= tempLista;
    }
    //Recorro la lista de productos y llamo a la funcion para generar html en base a la lista
    lista.map((product) => {
        //Igualo el i al ultimo id
        i= product.id;
        //En base a los datos recorridos en el .map, llamar a funcion para generar html
        generarHtml(product);
    })

    //Genero un unico html de mensaje de error si no encuentra busqueda en productos
    const listado= document.querySelector('.main__productos');
    const error= document.createElement('h2');
    error.className= 'main__productos__error';
    error.textContent= 'No se encontraron productos que coincidan con la busqueda';
    listado.appendChild(error);
}