// Global variables
let search = document.getElementById("searchBar");
let currentProdArray = [];
let currentCriteria = undefined;
let minPrice = undefined;
let maxPrice = undefined;
let filteredSearch = undefined;

// FUNCTIONS
// Show filtered search
function searchProd(){
  search.addEventListener("input", e => {

    const inpuText = e.target.value.toUpperCase().trim();
    filteredSearch = currentProdArray.filter(prod => prod.name.toUpperCase().includes(inpuText) || prod.description.toUpperCase().includes(inpuText));
    
    showProductList(filteredSearch);
  })
}

// Sorting criteria
const ORD_ASC_BY_PRICE = "PriceAsc";
const ORD_DESC_BY_PRICE = "PriceDesc";
const ORD_BY_RELEVANCE = "Rel.";

function sortProd(criteria, array){
  let result = [];

  if (criteria === ORD_ASC_BY_PRICE){
    result = array.sort(function(a, b){
      if (a.cost < b.cost) {return -1;}
      if (a.cost > b.cost) {return 1;}
      return 0;
    });
  } else if (criteria === ORD_DESC_BY_PRICE){
    result = array.sort(function(a, b){
      if (a.cost > b.cost) {return -1;}
      if (a.cost < b.cost) {return 1;}
      return 0;
    });
  } else if (criteria === ORD_BY_RELEVANCE) {
    result = array.sort(function(a, b){
      let aSold = parseInt(a.soldCount);
      let bSold = parseInt(b.soldCount);

      if (aSold > bSold) {return -1;}
      if (aSold < bSold) {return 1;}
      return 0;
    });
  }
  return result;
}

// Show product if it's between the range of minCount and maxCount
function showProductList(currentProdArray) {
  
  let contentToAppend = ""
  for (let item of currentProdArray) {

    if (((minPrice == undefined) || (minPrice !=undefined && parseInt(item.cost) >= minPrice)) &&
    ((maxPrice == undefined) || (maxPrice != undefined & parseInt(item.cost) <= maxPrice))){
      
      contentToAppend += `
        <div class="row item">
          <div class="col-sm-12 col-xl-2 col-xxl-2 col-lg-2 col-md-2 p-0 centrado">
            <img src="${item.image}">
          </div>
          <div class="col-sm-12 col-xl-8 col-xxl-8 col-lg-4 col-md-8 details">
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
      const clickedItemId = currentProdArray[index].id;
  
      localStorage.setItem("clickedItemId", clickedItemId);
  
      window.location.href = "product-info.html";
    });
  });
}

// Show sorted products
function showSortedProducts(sortCriteria, prodArray){
  currentCriteria = sortCriteria;

  if(prodArray != undefined) {
    currentProdArray = prodArray;
  } 
  currentProdArray = sortProd(currentCriteria, currentProdArray);
  showProductList(currentProdArray);
}


// EVENT HANDLERS
// Request and show data, and handle filter functionality
document.addEventListener("DOMContentLoaded", function(e){
  getJSONData(PRODUCTS_URL + `${localStorage.getItem("catID")}.json`)
  .then(function(resultado){
    if (resultado.status === "ok"){
      currentProdArray = resultado.data.products
      showProductList(currentProdArray);
      searchProd();
    }
  });

  // Sort in descending order by price
  document.getElementById("sortDescPrice").addEventListener("click", function(){
    showSortedProducts(ORD_DESC_BY_PRICE);
  });

  // Sort in ascending order by price
  document.getElementById("sortAscPrice").addEventListener("click", function(){
    showSortedProducts(ORD_ASC_BY_PRICE);
  });

  // Sort by relevance
  document.getElementById("sortByRel").addEventListener("click", function(){
    showSortedProducts(ORD_BY_RELEVANCE);
  });

  // Clear filter values
  document.getElementById("clearRangeFilterPrice").addEventListener("click", function(){
      document.getElementById("rangeFilterPriceMin").value = "";
      document.getElementById("rangeFilterPriceMax").value = "";

      minPrice = undefined;
      maxPrice = undefined;
      
      showProductList(currentProdArray);
  });

  // Sort between min and max price
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

      showProductList(currentProdArray);
  });
});

