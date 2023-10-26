const URL_carrito = 'https://japceibal.github.io/emercado-api/user_cart/25801.json';
const contenedor = document.querySelector('#carrito');
const subtotalTotal = document.getElementById('sumaSubtotal');
const costoEnvio = document.getElementById("costoEnvio")
const tipoDeEnvio = document.getElementById("tipoDeEnvio")
const totalCompra = document.getElementById("totalCompra");

// Traer y parsear productos comprados de localStorage
const productosCarrito = JSON.parse(localStorage.getItem('productosCarrito'))

////////////////////
///// Funciones ///
//////////////////

function actualizarSubtotal(id) {
    const input = document.getElementById(id);
    const subtotal = document.getElementById(`subtotal_${id}`);
    const producto = productosCarrito.find(p => p.id === id);
    const nuevoSubtotal = producto.unitCost * input.value;
    subtotal.textContent = producto.currency + ' ' + nuevoSubtotal;
    subtotalTotal.innerHTML = `USD ${totalSubtotal()}`
    prcEnvio();
    totalTotal();
}

//ENTREGA 6

//PAUTA 2
// Deshabilitar otro medio de pago según selección de checkbox
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
    subtotalTotal.innerHTML = `USD ${totalSubtotal()}`
    prcEnvio();
    totalTotal();
}

function totalSubtotal() {
    const subtotales = contenedor.querySelectorAll(".subtotal");
    let total = 0;
    let precio = 0;

    subtotales.forEach(subtotal => {
       let texto = subtotal.textContent;
       let num = parseInt(texto.slice(4));

       if(texto.includes('UYU')) {
        precio = num / 40;
       } else {
        precio = num;
       }

       total += precio;
    })
    total = Math.trunc(total);

    return total
}

function prcEnvio(){
    const premium = document.getElementById("option1")
    const express = document.getElementById("option2")
    const standard = document.getElementById("option3")

    let total = parseInt(subtotalTotal.textContent.slice(4))

    if (premium.checked){
       costoEnvio.innerHTML = `USD ${Math.trunc(total * 0.15)}`         
    } else if (express.checked){
        costoEnvio.innerHTML = `USD ${Math.trunc(total * 0.07)}`
    } else if (standard.checked) {
        costoEnvio.innerHTML = `USD ${Math.trunc(total * 0.05)}`
    }
}
 
function totalTotal() {
    const num1 = parseInt(subtotalTotal.textContent.slice(4));
    const num2 = parseInt(costoEnvio.textContent.slice(4));

    let sumaTotal = num1 + num2;

    totalCompra.innerHTML = `USD ${sumaTotal}`;
}

// Cargar en carrito articulo pre-cargado y actualizar subtotal
fetch(URL_carrito)
.then(response => response.json())
.then(data => {
    productosCarrito.push(data.articles[0])
    
    // Cargar productos comprados en carrito y actualizar subtotal
    for(let i=0; i<productosCarrito.length; i++) {
        contenedor.innerHTML +=`
        <div id="container-${productosCarrito[i].id}" class="row">
        <div class="col"><img class="" src="${productosCarrito[i].image}" style="width: 4rem"></div>
        <div class="col">${productosCarrito[i].name}</div>
        <div class="col">${productosCarrito[i].currency} ${productosCarrito[i].unitCost}</div>
        <div class="col"><input id="${productosCarrito[i].id}" type="number" min="0" style="width:60px" value="${productosCarrito[i].count}" onchange="actualizarSubtotal(${productosCarrito[i].id})"></div>
        <div class="col subtotal" id="subtotal_${productosCarrito[i].id}">${productosCarrito[i].currency} ${productosCarrito[i].unitCost}</div>
        <div class="col"><span class="${productosCarrito[i].id} bi bi-trash" onclick="borrar(this)"></span></div>
        <br><br>
        <hr>
        </div>`;
    }
    subtotalTotal.innerHTML = `USD ${totalSubtotal()}`
    totalTotal();
})

payMethod();

// Manejador de eventos a tipos de envio
const tiposEnvio = tipoDeEnvio.querySelectorAll("input");
tiposEnvio.forEach(envio => {
    envio.addEventListener("click", () => {
        prcEnvio();
        totalTotal();
    })
})