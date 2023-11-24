// API URLs
const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";


// Verify login
if (!localStorage.getItem("authenticated")) {
  window.location.href = "login.html";
}


// Elements
const navbar = document.getElementById("navbarNav")


// Spinner functions 
let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}


// Get JSON data function
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


// User button functionality
const userButton = document.getElementById("menuButton");
const menu = document.getElementById("menu");
const username = localStorage.getItem("user");

userButton.innerText = username;

userButton.addEventListener("click", function() {
  const isMenuVisible = menu.style.display === "block";
  
  menu.style.display = isMenuVisible ? "none" : "block";
});


// Log out functionality
const menuLogoutClick = document.getElementById("menuLogoutClick");

menuLogoutClick.addEventListener("click", function() {
  localStorage.removeItem("user");

  window.location.href = "login.html";
});


// Dark mode functionality
if (!document.getElementById('ftBgColorImg')) {
  const btnSwitch = document.querySelector('#switch');
  
  btnSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark')
    
    if (localStorage.getItem("authenticated") && document.body.classList.contains('dark')){
      localStorage.setItem('dark-mode', "true");
    } else {
      localStorage.setItem('dark-mode', "false");
    }
  
    if (document.querySelector("body").className === "dark") {
      document.querySelector(".bi.bi-moon").classList.replace("bi-moon", "bi-brightness-high")
    } else {
      document.querySelector(".bi.bi-brightness-high").classList.replace("bi-brightness-high", "bi-moon")
    }
  });
  
  if(localStorage.getItem("authenticated") && localStorage.getItem('dark-mode') === 'true') {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}