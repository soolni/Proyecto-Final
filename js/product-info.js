const DATA_URL = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem("clickedItemId")}.json`;
const COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem("clickedItemId")}.json`;

const arregloComentarios = JSON.parse(localStorage.getItem("nuevoComentario")) || []
    
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

        const nuevoComentarioJSON = localStorage.getItem("nuevoComentario");
        const nuevoComentario = JSON.parse(nuevoComentarioJSON);

        for(let j = 0; j < nuevoComentario.length; j++) {
          let starsHTML = '';
          for (let i = 0; i < nuevoComentario[j].rating; i++) {
          starsHTML += '<span class="fa fa-star checked"></span>';
          }

          for (let i = nuevoComentario[j].rating; i < 5; i++) {
          starsHTML += '<span class="fa fa-star"></span>';
          }

          if(nuevoComentario[j].id === localStorage.getItem("clickedItemId")){
  
              comments.innerHTML += `
              <p><strong>${nuevoComentario[j].usuario}</strong> - ${nuevoComentario[j].fecha} - ${starsHTML}</p>
              <p>${nuevoComentario[j].comentario}</p><hr>
              `; 
          }     
        }
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
    
      const comments = document.querySelector(".comentarios")  
    
      let stars = '';
        for (let i = 0; i < selectedRating; i++) {
        stars += '<span class="fa fa-star checked"></span>';
        }
        for (let i = selectedRating; i < 5; i++) {
        stars += '<span class="fa fa-star"></span>';
        }
    
        const usuario = localStorage.getItem("usuario");
        const ID = localStorage.getItem("clickedItemId")
        const fechaActual = new Date();
        const fechaFormateada = `${fechaActual.getFullYear()}-${('0' + (fechaActual.getMonth() + 1)).slice(-2)}-${('0' + fechaActual.getDate()).slice(-2)} ${('0' + fechaActual.getHours()).slice(-2)}:${('0' + fechaActual.getMinutes()).slice(-2)}:${('0' + fechaActual.getSeconds()).slice(-2)}`;
        
        const comentarioData = {
            rating: selectedRating,
            fecha: fechaFormateada,
            comentario: comentario,
            usuario: usuario,
            id: ID,
        };       

        arregloComentarios.push(comentarioData)
        console.log(arregloComentarios)

        const comentarioDataJSON = JSON.stringify(arregloComentarios);
        console.log(comentarioDataJSON)
        localStorage.setItem("nuevoComentario", comentarioDataJSON);
         
      // Limpia los campos después de enviar el comentario 
      ratingStars.forEach(star => star.classList.remove('checked'));
      comentarioTexto.value = '';
      location.reload()
    });  
