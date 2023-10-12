const URL_carrito = 'https://japceibal.github.io/emercado-api/user_cart/25801.json';
fetch(URL_carrito)
.then(response => response.json())
.then(data => {
const contenedor = document.querySelector('#carrito');
contenedor.innerHTML += `
<div class="row">
    <div class="col"><img class="" src="${data.articles[0].image}" style="width: 4rem"></div>
    <div class="col">${data.articles[0].name}</div>
    <div class="col">USD ${data.articles[0].unitCost}</div>
    <div class="col"><input id="inp" type="number" min="0" style="width:60px" value="${data.articles[0].count}"></div>
    <div id="subtotal" class="col">${data.articles[0].currency} ${data.articles[0].unitCost}</div>
    <div class="col"></div>
</div>
`
function actualizarSubtotal() {
    const cantidadInp = document.querySelector('#inp');
    const cantidad = cantidadInp.value;
    const subtotal = cantidad * data.articles[0].unitCost;
    document.querySelector('#subtotal').textContent = `USD ${subtotal}`;
    }

document.getElementById("inp").addEventListener("input", actualizarSubtotal);

})

const productosCarrito = JSON.parse(localStorage.getItem('productosCarrito'))
console.log(productosCarrito)


productosCarrito.forEach(producto => {
    const container = document.querySelector('#carrito');
    container.innerHTML +=`
    <div class="row">
    <div class="col"><img class="" src="${producto.image}" style="width: 4rem"></div>
    <div class="col">${producto.name}</div>
    <div class="col">USD ${producto.unitCost}</div>
    <div class="col"><input id="${producto.id}" type="number" min="0" style="width:60px" value="${producto.count}" onchange="actualizarSubtotal(${producto.id})"></div>
    <div class="col" id="subtotal_${producto.id}">${producto.currency} ${producto.unitCost}</div>
    <div class="col"></div>
    </div>`;
});
    function actualizarSubtotal(id) {
        const input = document.getElementById(id);
        const subtotal = document.getElementById(`subtotal_${id}`);
        const producto = productosCarrito.find(p => p.id === id);
        const nuevoSubtotal = producto.unitCost * input.value;
        subtotal.textContent = producto.currency + ' ' + nuevoSubtotal;
    }
       