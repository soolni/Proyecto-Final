// When selected show cars, toys or furniture products
document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("cars").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("toys").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("furniture").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});