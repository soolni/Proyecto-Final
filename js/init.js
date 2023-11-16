const CATEGORIES_URL = "http://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

if (!localStorage.getItem("autenticado")) {
  window.location.href = "login.html";
}

const navbar = document.getElementById("navbarNav")

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

const userButton = document.getElementById("menuButton");
const menu = document.getElementById("menu");
const username = localStorage.getItem("usuario");
const menuLogoutClick = document.getElementById("menuLogoutClick");

// nombre de usuario en boton
userButton.innerText = username;

userButton.addEventListener("click", function() {
  // Verificar el estado actual del menú
  const isMenuVisible = menu.style.display === "block";

  // Mostrar u ocultar el menú según su estado actual
  menu.style.display = isMenuVisible ? "none" : "block";
});

menuLogoutClick.addEventListener("click", function() {
  // borrar datos almacenados
  localStorage.removeItem("usuario");

  // redireccionar
  window.location.href = "login.html";
});

// Boton modo dia/noche

const btnSwitch = document.querySelector('#switch');

btnSwitch.addEventListener('click', () => {
  document.body.classList.toggle('dark')
  
  //Guardar en localSotage
  if (localStorage.getItem("autenticado") && document.body.classList.contains('dark')){
    localStorage.setItem('dark-mode', "true");
  } else {
    localStorage.setItem('dark-mode', "false");
  }

  //Cambiar el icono
  if (document.querySelector("body").className === "dark") {
    document.querySelector(".fas.fa-moon").classList.replace("fa-moon", "fa-sun")
  } else {
    document.querySelector(".fas.fa-sun").classList.replace("fa-sun", "fa-moon")
  }

});

// Obtener el modo actual

if(localStorage.getItem("autenticado") && localStorage.getItem('dark-mode') === 'true') {
  document.body.classList.add('dark');
} else {
  document.body.classList.remove('dark');
}