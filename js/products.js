const DATA_URL = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem("catID")}.json`;
const container = document.getElementById("products");

  function showDataProduct(dataArray) {
        for (let item of dataArray) {
          let itemHtml = '<div class="item">';
          itemHtml += `<img src="${item.image}">`; 
          itemHtml += '<div class="details">';
          itemHtml += `ID: ${item.id}<br>`;
          itemHtml += `Nombre: ${item.name}<br>`;
          itemHtml += `Descripción: ${item.description}<br>`;
          itemHtml += `Precio: ${item.cost} ${item.currency}<br>`;
          itemHtml += `Unidades vendidas: ${item.soldCount}<br>`;
          itemHtml += '</div>';
          itemHtml += '</div>';
          container.innerHTML += itemHtml;
        }
      }
    fetch(DATA_URL)
        .then(response =>  response.json())
        .then (data => {showDataProduct(data.products)}); 
        