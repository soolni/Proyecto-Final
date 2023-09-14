const DATA_URL = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem("clickedItemId")}.json`;
const COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem("clickedItemId")}.json`;

    
fetch(DATA_URL)
    .then(response => response.json())
    .then(data=>{
        const productElement = document.querySelector(".product-info")

        productElement.innerHTML = `
                <br>
                <h2>${data.name}</h2>
                <br><hr>

                <p><strong>Precio</strong><br>${data.currency +' '+ data.cost}</p>

                <p><strong>Descripcion</strong><br>${data.description}</p>

                <p><strong>Categoria</strong><br>${data.category}</p>

                <p><strong>Cantidad de vendidos</strong><br>${data.soldCount}</p>

                <p><strong>Imagenes ilustrativas</strong></p>
                `;
                const productImages = data.images;
                productImages.forEach(imagen => {
                    productElement.innerHTML += `<img src="${imagen}" alt="" width="150px">`
                });


                });
    




fetch(COMMENTS_URL)
    .then(response => response.json())
    .then(data => {
        const comments = document.querySelector(".comentarios");

        data.forEach(function (e) {
            const comentario = document.createElement("p");
            comentario.innerHTML = `<strong>${e.user}</strong> - ${e.dateTime} - 
              <span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>`;

            const stars = comentario.querySelectorAll("span.fa-star");
            for (let i = 0; i < e.score; i++) {
                stars[i].classList.add("checked");
            }

            const descripcion= document.createElement("p");
            descripcion.textContent = e.description;

            comments.appendChild(comentario);
            comments.appendChild(descripcion);
            comments.appendChild(document.createElement("hr"));
        });
    })
    .catch(error => {
        console.error("Error al cargar comentarios:", error);
    });

    const ratingStars = document.querySelectorAll('.fa-star');
    let selectedRating = 0;
    
    ratingStars.forEach(star => {
      star.addEventListener('click', function() {
        const rating = parseInt(this.getAttribute('data-rating'));
    
        // Remueve la clase 'checked' de todas las estrellas
        ratingStars.forEach(star => star.classList.remove('checked'));
    
        // Agrega la clase 'checked' a las estrellas seleccionadas y anteriores
        for (let i = 0; i < rating; i++) {
          ratingStars[i].classList.add('checked');
        }
    
        // Guarda la puntuación seleccionada en una variable
        selectedRating = rating;
        
      });
    });
    
    const btnComentar = document.querySelector('.btn-comentar');
    btnComentar.addEventListener('click', function() {
      const comentarioTexto = document.querySelector('.comentario-texto');
      const comentario = comentarioTexto.value;
    
      // Aquí puedes utilizar la variable "selectedRating" y "comentario" para realizar cualquier acción adicional, como enviarlos al servidor
      console.log(selectedRating)
      console.log(comentario)
      const comments = document.querySelector(".comentarios")  
    
      let stars = '';
        for (let i = 0; i < selectedRating; i++) {
        stars += '<span class="fa fa-star checked"></span>';
        }
        for (let i = selectedRating; i < 5; i++) {
        stars += '<span class="fa fa-star"></span>';
        }
    
        const usuario = localStorage.getItem("usuario");
        const fechaActual = new Date();
        const fechaFormateada = `${fechaActual.getFullYear()}-${('0' + (fechaActual.getMonth() + 1)).slice(-2)}-${('0' + fechaActual.getDate()).slice(-2)} ${('0' + fechaActual.getHours()).slice(-2)}:${('0' + fechaActual.getMinutes()).slice(-2)}:${('0' + fechaActual.getSeconds()).slice(-2)}`;
    
        comments.innerHTML += `
        <p><strong>${usuario}</strong> - ${fechaFormateada} - ${stars}</p>
        <p>${comentario}</p><hr>
        `;
          
      
    
      // Limpia los campos después de enviar el comentario (esto es solo un ejemplo)
      ratingStars.forEach(star => star.classList.remove('checked'));
      comentarioTexto.value = '';
    });



