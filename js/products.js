const DATA_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";
const container = document.getElementById("products");

function showDataProduct(dataArray) {
    for (let item of dataArray) {
      let itemHtml = '<div class="item">';
      itemHtml += `<img src="${item.image}">`; 
      itemHtml += '<div class="details">';
      itemHtml += `ID: ${item.id}<br>`;
      itemHtml += `Name: ${item.name}<br>`;
      itemHtml += `Description: ${item.description}<br>`;
      itemHtml += `Cost: ${item.cost} ${item.currency}<br>`;
      itemHtml += `Sold Count: ${item.soldCount}<br>`;
      itemHtml += '</div>';
      itemHtml += '</div>';
      container.innerHTML += itemHtml;
    }
  }


fetch(DATA_URL)
    .then(response =>  response.json())
    .then (data => {showDataProduct(data.products)});
    

    