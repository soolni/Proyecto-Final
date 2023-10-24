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
    <div class="col"><span class="bi bi-trash"></span></div>
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
    <div id="container-${producto.id}" class="row">
    <div class="col"><img class="" src="${producto.image}" style="width: 4rem"></div>
    <div class="col">${producto.name}</div>
    <div class="col">USD ${producto.unitCost}</div>
    <div class="col"><input id="${producto.id}" type="number" min="0" style="width:60px" value="${producto.count}" onchange="actualizarSubtotal(${producto.id})"></div>
    <div class="col" id="subtotal_${producto.id}">${producto.currency} ${producto.unitCost}</div>
    <div class="col"><span class="${producto.id} bi bi-trash" onclick="borrar(this)"></span></div>
    </div>`;
});
    function actualizarSubtotal(id) {
        const input = document.getElementById(id);
        const subtotal = document.getElementById(`subtotal_${id}`);
        const producto = productosCarrito.find(p => p.id === id);
        const nuevoSubtotal = producto.unitCost * input.value;
        subtotal.textContent = producto.currency + ' ' + nuevoSubtotal;
    }
       


//ENTREGA 6

//PAUTA 2
function payMethod(){
const radioUno = document.querySelector(".metodo-pago-uno");
const radioDos = document.querySelector(".metodo-pago-dos");
const credito = document.querySelectorAll('.tarjeta-credito');
const transferencia = document.querySelector('.transferencia')
if(radioUno.checked){
    credito.forEach(elemento =>{
        elemento.disabled = false;
        elemento.classList.toggle('pe-none');
        elemento.removeAttribute("aria-disabled")
        elemento.value = ""
        elemento.style.backgroundColor = 'white'
    })
    transferencia.disabled = true;
    transferencia.classList.add('pe-none');
    transferencia.setAttribute("aria-disabled", "true")
    transferencia.value = ""
    transferencia.style.backgroundColor = 'grey'
}
if(radioDos.checked){
    transferencia.classList.toggle('pe-none');
    transferencia.removeAttribute("aria-disabled");
    transferencia.disabled = false;
    transferencia.style.backgroundColor = 'white'
    credito.forEach(elemento =>{
        elemento.disabled = true;
        elemento.classList.add('pe-none');
        elemento.setAttribute("aria-disabled", "true")
        elemento.value = ""
        elemento.style.backgroundColor = 'grey'
    })
}
}

payMethod();

//Desafiate 
function borrar(clase){
    const clases = clase.className.split(' ');
    const primeraClase = clases[0];
    const div = document.getElementById(`container-${primeraClase}`)
    div.remove()
    let productos = JSON.parse(localStorage.getItem('productosCarrito'));
    const posicion = productos.findIndex(producto => producto.id === parseInt(primeraClase));
    productos.splice(posicion, 1)
    localStorage.setItem('productosCarrito', JSON.stringify(productos));
}