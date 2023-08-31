if (!localStorage.getItem("autenticado")) {
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});




if (localStorage.getItem("usuario")) {
    const item = document.querySelectorAll(".nav-item")[3];
    const link = document.createElement("a");
    link.classList.add("nav-link");
    link.setAttribute("href", "my-profile.html");
    link.innerHTML = `${localStorage.getItem("usuario")}`;
    item.appendChild(link);
  }