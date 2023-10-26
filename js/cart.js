const URL_carrito = 'https://japceibal.github.io/emercado-api/user_cart/25801.json';
const contenedor = document.querySelector('#carrito');
const subtotalTotal = document.getElementById('sumaSubtotal');
let sumaSubtotal = 0;

// Cargar en carrito articulo pre-cargado y actualizar subtotal
fetch(URL_carrito)
.then(response => response.json())
.then(data => {
contenedor.innerHTML += `
<div id="container-${data.id}" class="row">
    <div class="col"><img class="" src="${data.articles[0].image}" style="width: 4rem"></div>
    <div class="col">${data.articles[0].name}</div>
    <div class="col">USD ${data.articles[0].unitCost}</div>
    <div class="col"><input id="inp" type="number" min="0" style="width:60px" value="${data.articles[0].count}"></div>
    <div id="subtotal" class="col">${data.articles[0].currency} ${data.articles[0].unitCost}</div>
    <div class="col"><span class="${data.id} bi bi-trash" onclick="borrarProductoPrecargado(this)"></span></div>
    <br><br>
    <hr>
</div>
`
sumaSubtotal += data.articles[0].unitCost;
subtotalTotal.innerHTML = `USD ${sumaSubtotal}`;

function actualizarSubtotal() {
    const cantidadInp = document.querySelector('#inp');
    const cantidad = cantidadInp.value;
    const subtotal = cantidad * data.articles[0].unitCost;
    document.querySelector('#subtotal').textContent = `USD ${subtotal}`;
    sumaSubtotal += data.articles[0].unitCost;
    subtotalTotal.innerHTML = `USD ${sumaSubtotal}`;
    }

document.getElementById("inp").addEventListener("input", actualizarSubtotal);

})

// Traer y parsear productos comprados de localStorage
const productosCarrito = JSON.parse(localStorage.getItem('productosCarrito'))

// Cargar productos comprados en carrito y actualizar subtotal
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
    <br><br>
    <hr>
    </div>`;

    if(producto.currency === 'UYU'){
        sumaSubtotal += producto.unitCost / 40;
        subtotalTotal.innerHTML = `USD ${sumaSubtotal}`;
    } else {
        sumaSubtotal += producto.unitCost
        subtotalTotal.innerHTML = `USD ${sumaSubtotal}`;
    }

});
    function actualizarSubtotal(id) {
        const input = document.getElementById(id);
        const subtotal = document.getElementById(`subtotal_${id}`);
        const producto = productosCarrito.find(p => p.id === id);
        const nuevoSubtotal = producto.unitCost * input.value;
        subtotal.textContent = producto.currency + ' ' + nuevoSubtotal;
        if(producto.currency === 'UYU'){
            sumaSubtotal += producto.unitCost / 40;
            subtotalTotal.innerHTML = `USD ${sumaSubtotal}`;
        } else {
            sumaSubtotal += producto.unitCost;
            subtotalTotal.innerHTML = `USD ${sumaSubtotal}`;
        }
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
    transferencia.style.backgroundColor = 'lightcyan'
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
        elemento.style.backgroundColor = 'lightcyan'
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

function borrarProductoPrecargado(clase){
    const clases = clase.className.split(' ');
    const primeraClase = clases[0];
    const div = document.getElementById(`container-${primeraClase}`)
    div.remove()
}















































//PAUTA 3

const inputGroup = document.querySelectorAll('.input-group-envio');
const finalizarCompra = document.querySelector('.boton-finalizar');
const formEnvio = document.querySelector('.formulario-envio');
const inputCalle = document.querySelector('.input-calle');
const inputNum = document.querySelector('.input-numero');
const inputEsq = document.querySelector('.input-esquina');



function envioEsqCheck(){
    const esquina = document.querySelector('.esquina');
    if (!inputEsq.checkValidity()) {
        esquina.classList.remove('d-none','d-block');
        inputEsq.classList.add('is-invalid');
    } else {
        esquina.classList.add('d-none','d-block');
        inputEsq.classList.remove('is-invalid');
    }
}
function envioNumCheck(){
    const numero = document.querySelector('.numero');
    if (!inputNum.checkValidity()) {
        numero.classList.remove('d-none','d-block');
        inputNum.classList.add('is-invalid');
    } else {
        numero.classList.add('d-none','d-block');
        inputNum.classList.remove('is-invalid');
    }
}
function envioCalleCheck(){
    const calle = document.querySelector('.calle');
    if (!inputCalle.checkValidity()) {
        calle.classList.remove('d-none','d-block');
        inputCalle.classList.add('is-invalid');
    } else {
        calle.classList.add('d-none','d-block');
        inputCalle.classList.remove('is-invalid');
    }
}

function numTarjCred(){
    const numeroTarjeta = document.querySelector('.credito-numero');
    const warningNumTarj = document.querySelector('.warning-credito-numero')
    if(!numeroTarjeta.checkValidity()){
        warningNumTarj.classList.remove('d-none', 'd-black')
        numeroTarjeta.classList.add('is-invalid');
    }
    else{
        warningNumTarj.classList.add('d-none', 'd-black')
        numeroTarjeta.classList.remove('is-invalid');
    }
}

function cvvTarjCred(){
    const cvvTarjeta = document.querySelector('.credito-cvv');
    const warningCvvTarj = document.querySelector('.warning-credito-cvv');
    if(!cvvTarjeta.checkValidity()){
        warningCvvTarj.classList.remove('d-none', 'd-black')
        cvvTarjeta.classList.add('is-invalid');
    }
    else{
        warningCvvTarj.classList.add('d-none', 'd-black')
        cvvTarjeta.classList.remove('is-invalid');
    }
}

function vencimientoTarjCred(){
    const vencimientoTarjeta = document.querySelector('.credito-vencimiento');
    const warningVenciTarj = document.querySelector('.warning-credito-vencimiento');
    if(!vencimientoTarjeta.checkValidity()){
        warningVenciTarj.classList.remove('d-none', 'd-black')
        vencimientoTarjeta.classList.add('is-invalid');
    }
    else{
        warningVenciTarj.classList.add('d-none', 'd-black')
        vencimientoTarjeta.classList.remove('is-invalid');
    }
}


function modal(){
    const transBancaria = document.querySelector('.metodo-pago-dos');
    const tarjCredito = document.querySelector('.metodo-pago-uno');
    const metodoPago = document.querySelector('.warning-tarjetaCredito');
    const transNum = document.querySelector('.transferencia-numero');
    const transWarningNum = document.querySelector('.warning-transferencia-numero');

    if(!transBancaria.checked && !tarjCredito.checked){
        metodoPago.classList.remove('d-none', 'd-block')
    }
    
    if(!transBancaria.checked){
        numTarjCred();
        cvvTarjCred();
        vencimientoTarjCred();
    }
    if(!tarjCredito.checked){
        if(!transNum.checkValidity()){
            transNum.classList.remove('is-invalid');
            transWarningNum.classList.add('d-none', 'd-black');
        }
        else{
            transNum.classList.add('is-invalid');
            transWarningNum.classList.remove('d-none', 'd-black');
        }
    }

}


finalizarCompra.addEventListener('click',function(){
    let inputGroupPress = false;
    inputGroup.forEach(button=>{
        if (button.checked) {
            inputGroupPress = true;
        }  
    })
    
    function grupodeinputs(){
        const tipoEnvio = document.querySelector('.tipo-envio');
        if(inputGroupPress){
            tipoEnvio.classList.toggle('d-none', 'd-block');
        }
        if(!inputGroupPress){
            tipoEnvio.classList.remove('d-none', 'd-block');
        }
    }
    grupodeinputs()

    envioCalleCheck();
    envioEsqCheck();
    envioNumCheck();

    modal()
})