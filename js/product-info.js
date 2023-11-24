// Arrays
const arrayComments = JSON.parse(localStorage.getItem("newComment")) || [];
console.log(arrayComments);
const arrayProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];


// Add product to products array or if it exists increase count
function addObject(object) {
  const existingObject = arrayProducts.find(obj => obj.id === object.id);

  if (existingObject) {
    existingObject.count++;
  } else {
    object.count = 1;
    arrayProducts.push(object);
  }
}                  


// Fetch product info and handle purchase button functionality
fetch(PRODUCT_INFO_URL + `${localStorage.getItem("clickedItemId")}.json`)
    .then(response => response.json())
    .then(data=>{
        const productElement = document.querySelector(".product-info")

        productElement.innerHTML = `
                <br>
                <br>
                <div class="d-lg-none d-xl-none d-xxl-none">
                <h2 class="productName">${data.name}</h2>
                <hr>
                </div>
                <div class="row">
                  <div id="carouselExampleControls" class="carousel slide col-lg-6" data-bs-ride="carousel">
                  <div class="carousel-inner">
                  <div class="carousel-item active">
                  <img src="img/prod${data.id}_1.jpg" class="d-block w-100" alt="...">
                  </div>
                  <div class="carousel-item">
                  <img src="img/prod${data.id}_2.jpg" class="d-block w-100" alt="...">
                  </div>
                  <div class="carousel-item">
                  <img src="img/prod${data.id}_3.jpg" class="d-block w-100" alt="...">
                  </div>
                  <div class="carousel-item">
                  <img src="img/prod${data.id}_4.jpg" class="d-block w-100" alt="...">
                  </div>
                  </div>
                  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                  </button>
                  <p><strong>Imágenes ilustrativas</strong></p>
                  </div>
                  <div class="producto col-lg-6">
                    
                    <div class="col-12">  
                      <div class="d-md-none d-sm-none d-none d-lg-block">
                        <h2 class="productName">${data.name}</h2>
                        <hr>
                      </div>
                    
                      <p><strong>Precio</strong><br>${data.currency +' '+ data.cost}</p>

                      <p><strong>Descripción</strong><br>${data.description}</p>

                      <p><strong>Categoría</strong><br>${data.category}</p>

                      <p><strong>Cantidad de vendidos</strong><br>${data.soldCount}</p>

                      <button class="btn btn-primary comprar" id="buy" type="button">Comprar</button>
                    </div> 
                    
                  </div>
                </div>
                `;                              

                document.getElementById("buy").addEventListener("click", () => {
                  const articles = {
                              "id": data.id,
                              "name": data.name,
                              "count": 1,
                              "unitCost": data.cost,
                              "currency": data.currency,
                              "image": data.images[0]
                          };

                  addObject(articles)

                  localStorage.setItem('cartProducts', JSON.stringify(arrayProducts))
                })
                });
    


// Fetch product comments and handle new comment functionality
fetch(PRODUCT_INFO_COMMENTS_URL + `${localStorage.getItem("clickedItemId")}.json`)
    .then(response => response.json())
    .then(data => {
        const comments = document.querySelector(".comments");

        data.forEach(function (e) {
            const comment = document.createElement("p");
            comment.innerHTML = `<div class="infoCom"><div><strong>${e.user}</strong> - ${e.dateTime} &nbsp </div><div>
              <span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span></div></div>`;

            const stars = comment.querySelectorAll("span.fa-star");
            for (let i = 0; i < e.score; i++) {
                stars[i].classList.add("checked");
            }

            const description = document.createElement("p");
            description.textContent = e.description;

            comments.appendChild(comment);
            comments.appendChild(description);
            comments.appendChild(document.createElement("hr"));
        });

        const newCommentJSON = localStorage.getItem("newComment");
        const newComment = JSON.parse(newCommentJSON);

        for(let j = 0; j < newComment.length; j++) {
          let starsHTML = '';
          for (let i = 0; i < newComment[j].rating; i++) {
          starsHTML += '<span class="fa fa-star checked"></span>';
          }

          for (let i = newComment[j].rating; i < 5; i++) {
          starsHTML += '<span class="fa fa-star"></span>';
          }

          if(newComment[j].id === localStorage.getItem("clickedItemId")){
  
              comments.innerHTML += `
              <p><strong>${newComment[j].user}</strong> - ${newComment[j].date} - ${starsHTML}</p>
              <p>${newComment[j].comment}</p><hr>
              `; 
          }     
        }
    })
    .catch(error => {
        console.error("Error loading comments:", error);
    });

    const ratingStars = document.querySelectorAll('.fa-star');
    let selectedRating = 0;
    
    ratingStars.forEach(star => {
      star.addEventListener('click', function() {
        const rating = parseInt(this.getAttribute('data-rating'));
    
        ratingStars.forEach(star => star.classList.remove('checked'));
    
        for (let i = 0; i < rating; i++) {
          ratingStars[i].classList.add('checked');
        }
    
        selectedRating = rating;
        
      });
    });
    
    // New comment functionality
    const btnComment = document.querySelector('.comment-btn');
    btnComment.addEventListener('click', function() {
      const textComment = document.querySelector('.text-comment');
      const comment = textComment.value;
    
      const comments = document.querySelector(".comments")  
    
      let stars = '';
        for (let i = 0; i < selectedRating; i++) {
        stars += '<span class="fa fa-star checked"></span>';
        }
        for (let i = selectedRating; i < 5; i++) {
        stars += '<span class="fa fa-star"></span>';
        }
    
        const user = localStorage.getItem("user");
        const ID = localStorage.getItem("clickedItemId")
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${('0' + (currentDate.getMonth() + 1)).slice(-2)}-${('0' + currentDate.getDate()).slice(-2)} ${('0' + currentDate.getHours()).slice(-2)}:${('0' + currentDate.getMinutes()).slice(-2)}:${('0' + currentDate.getSeconds()).slice(-2)}`;
        
        const commentData = {
            rating: selectedRating,
            date: formattedDate,
            comment: comment,
            user: user,
            id: ID,
        };       

        arrayComments.push(commentData)

        const commentDataJSON = JSON.stringify(arrayComments);
        localStorage.setItem("newComment", commentDataJSON);
         
      ratingStars.forEach(star => star.classList.remove('checked'));
      textComment.value = '';
      location.reload()
    });  


// Related products functionality
fetch(PRODUCTS_URL + `${localStorage.getItem("catID")}.json`)
  .then(response => response.json())
  .then(data => {
    const products = data.products;
    const randomProducts = [];

    while (randomProducts.length < 3 && randomProducts.length < products.length) {
      const randomIndex = Math.floor(Math.random() * products.length);
      const randomProduct = products[randomIndex];

      if (!randomProducts.includes(randomProduct)) {
        randomProducts.push(randomProduct);
      }
    }

    const relatedElement = document.getElementById("related");
    let html = "";

    randomProducts.forEach(product => {   
      html += `<div id="related-card" class="cursor-active" data-id="${product.id}">
                 <img class="img-fluid" src="${product.image}" alt="${product.name}">
                 <h5>${product.name}</h5>
               </div>`;          
    });     
    relatedElement.innerHTML = html;        

    const cards = document.querySelectorAll("#related-card");
    cards.forEach(card => {
    card.addEventListener("click", () => {
    const clickedItemId = card.getAttribute("data-id");

    localStorage.setItem("clickedItemId", clickedItemId);

    window.location.href = "product-info.html";
  });
  });
  })
  .catch(error => {
    console.error('Error:', error);
});