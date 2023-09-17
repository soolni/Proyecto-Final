const DATA_URL = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem("catID")}.json`;

/*PRUEBA DEL FILTRO*/

/*Defino las variables globales*/
let search = document.getElementById("buscador");
let arregloActualProd = [];
let criterioActual = undefined;
let minPrice = undefined;
let maxPrice = undefined;
let buscadorFiltrado = undefined;

/*Funcion del buscador*/
function buscarProd(){
  search.addEventListener("input", e => {

    const inpuText = e.target.value.toUpperCase().trim();
    buscadorFiltrado = arregloActualProd.filter(prod => prod.name.toUpperCase().includes(inpuText) || prod.description.toUpperCase().includes(inpuText));
    
    showProductList(buscadorFiltrado);
  
  })
}

/*Defino los criterios de orden */

const ORDEN_ASC_POR_PRECIO = "PriceAsc";
const ORDEN_DESC_POR_PRECIO = "PriceDesc";
const ORDEN_POR_RELEVANCIA = "Rel.";

function ordenarProd(criterio, arreglo){
  let result = [];

  if (criterio === ORDEN_ASC_POR_PRECIO){
    result = arreglo.sort(function(a, b){
      if (a.cost < b.cost) {return -1;}
      if (a.cost > b.cost) {return 1;}
      return 0;
    });
  } else if (criterio === ORDEN_DESC_POR_PRECIO){
    result = arreglo.sort(function(a, b){
      if (a.cost > b.cost) {return -1;}
      if (a.cost < b.cost) {return 1;}
      return 0;
    });
  } else if (criterio === ORDEN_POR_RELEVANCIA) {
    result = arreglo.sort(function(a, b){
      let aVendidos = parseInt(a.soldCount);
      let bVendidos = parseInt(b.soldCount);

      if (aVendidos > bVendidos) {return -1;}
      if (aVendidos < bVendidos) {return 1;}
      return 0;
    });
  }
  return result;
}

/*funcion que muestra los productos*/

function showProductList(arregloActualProd) {
  
  let contentToAppend = ""
  for (let item of arregloActualProd) {

    if (((minPrice == undefined) || (minPrice !=undefined && parseInt(item.cost) >= minPrice)) &&
    ((maxPrice == undefined) || (maxPrice != undefined & parseInt(item.cost) <= maxPrice))){
      
      contentToAppend += `
        <div class="item">
          <img src="${item.image}">
          <div class="details">
            <span class="nombreProd">${item.name}<br></span>
            Descripción: ${item.description}<br>
            <span class="precioProd">Precio: ${item.cost} ${item.currency}<br></span>
            Unidades vendidas: ${item.soldCount}<br>
          </div>
        </div>
        `
      }
  }
  document.getElementById("products").innerHTML = contentToAppend;
  const items = document.querySelectorAll(".item");

  items.forEach((item, index) => {
    item.classList.add('cursor-active')
    item.addEventListener("click", () => {
      // Obtener el ID del elemento div al que se le hizo clic
      const clickedItemId = arregloActualProd[index].id;
  
      // Guardar el ID en el Local Storage
      localStorage.setItem("clickedItemId", clickedItemId);
  
      // Redireccionar a otra página o realizar otras acciones, si es necesario
      window.location.href = "product-info.html";
    });
  });
}

/*Función que ordena y muestra los productos */

function MostrarProdOrdenados(criterioDeOrden, arregloDeProd){
  criterioActual = criterioDeOrden;

  if(arregloDeProd != undefined) {
    arregloActualProd = arregloDeProd;
  } 
  arregloActualProd = ordenarProd(criterioActual, arregloActualProd);
  showProductList(arregloActualProd);
}

/*Función que se ejecuta una vez que que el documento se encuentra cargado*/

document.addEventListener("DOMContentLoaded", function(e){
  getJSONData(DATA_URL).then(function(resultado){
    if (resultado.status === "ok"){
      arregloActualProd = resultado.data.products
      showProductList(arregloActualProd);
      buscarProd();
    }
  });

  //Para mostrar listado de productos ordenados por precio descendente
  document.getElementById("sortDescPrice").addEventListener("click", function(){
    MostrarProdOrdenados(ORDEN_DESC_POR_PRECIO);
  });

  //Para mostrar listado de productos ordenados por precio ascendente 
  document.getElementById("sortAscPrice").addEventListener("click", function(){
    MostrarProdOrdenados(ORDEN_ASC_POR_PRECIO);
  });

  //Para mostrar listado de productos ordenados por relevancia
  document.getElementById("sortByRel").addEventListener("click", function(){
    MostrarProdOrdenados(ORDEN_POR_RELEVANCIA);
  });

  //Para limpiar el rango de precio
  document.getElementById("clearRangeFilterPrice").addEventListener("click", function(){
      document.getElementById("rangeFilterPriceMin").value = "";
      document.getElementById("rangeFilterPriceMax").value = "";

      minPrice = undefined;
      maxPrice = undefined;
      
      showProductList(arregloActualProd);
  });

  //Para buscar por rango de precio
  document.getElementById("rangeFilterPrice").addEventListener("click", function(){
    minPrice = document.getElementById("rangeFilterPriceMin").value;
    maxPrice = document.getElementById("rangeFilterPriceMax").value;
  
      if ((minPrice != undefined) && (minPrice !="") && (parseInt(minPrice)) >=0) {
        minPrice = parseInt(minPrice);
      } else {
        minPrice = undefined;
      }

      if ((maxPrice != undefined) && (maxPrice !="") && (parseInt(maxPrice)) >=0){
        maxPrice = parseInt(maxPrice);
      } else {
        maxPrice = undefined;
      }

      showProductList(arregloActualProd);
  });

});

