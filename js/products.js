const DATA_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";
const container = document.getElementById("products");


function showDataProduct(dataArray) {
  for (let item of dataArray) {
    let itemHtml = '<div class="item">';
    itemHtml += `<img src="${item.image}" class="image">`;
    itemHtml += '<div class="details">';
    for (let x in item) {
      if (x !== 'image') {
        itemHtml += `<div>${x}: ${item[x]}</div>`;
      }
    }
    itemHtml += '</div>';
    itemHtml += '</div>';
    container.innerHTML += itemHtml;
  }
}


fetch(DATA_URL)
    .then(response =>  response.json())
    .then (data => {showDataProduct(data.products)});
    

    