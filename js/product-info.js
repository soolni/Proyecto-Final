const DATA_URL = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem("clickedItemId")}.json`;

let contentToAppend = '';      
fetch(DATA_URL)
    .then(response => response.json())
    .then(data=>{
        const productElement = document.querySelector(".product-info")
        productElement.innerHTML = `
                <br>
                <h2>${data.name}</h2>
                <br><hr>
                <p><strong>Precio</strong><br>
                ${data.currency +' '+ data.cost}</p>
                <p><strong>Descripcion</strong><br>
                ${data.description}</p>
                <p><strong>Categoria</strong><br>
                ${data.category}</p>
                <p><strong>Cantidad de vendidos</strong><br>
                ${data.soldCount}</p>
                <p><strong>Imagenes ilustrativas</strong></p>
                `;
                const productImages = data.images;
                productImages.forEach(imagen => {
                    productElement.innerHTML += `<img src="${imagen}" alt="" width="150px">`
                });


                });