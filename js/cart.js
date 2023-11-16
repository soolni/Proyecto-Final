// ACA TAMBIEN HAY QUE USAR LA CONSTANTE QUE ESTA EN INIT.JS
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
        <div class="col"><input id="${productosCarrito[i].id}" type="number" min="1" style="width:60px" value="${productosCarrito[i].count}" onchange="actualizarSubtotal(${productosCarrito[i].id})"></div>
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
//PAUTA 3

const inputGroup = document.querySelectorAll('.input-group-envio');
const finalizarCompra = document.querySelector('.boton-finalizar');
const inputCalle = document.querySelector('.input-calle');
const inputNum = document.querySelector('.input-numero');
const inputEsq = document.querySelector('.input-esquina');
const compCamposWarning = document.querySelector('.warning-completar-campos');

let envEsquinaAlert = false;
let envNumAlert = false;
let envCalleAlert = false;
let numTarjeAlert = true;
let cvvTarjeAlert = true;
let vencTarjeAlert = true;
let modalAlert = true;
let tipoEnvioAlert = false;

function envioEsqCheck(){
    const esquina = document.querySelector('.esquina');
    if (!inputEsq.checkValidity()) {
        esquina.classList.remove('d-none');
        inputEsq.classList.add('is-invalid');
        envEsquinaAlert = false;
    } else {
        esquina.classList.add('d-none');
        inputEsq.classList.remove('is-invalid');
        envEsquinaAlert = true;
        console.log()
    }
}
  

function envioNumCheck(){
    const numero = document.querySelector('.numero');
    if (!inputNum.checkValidity()) {
        numero.classList.remove('d-none');
        inputNum.classList.add('is-invalid');
        envNumAlert = false;
    } else {
        numero.classList.add('d-none');
        inputNum.classList.remove('is-invalid');
        envNumAlert = true;
        console.log(envNumAlert)
    }
}


function envioCalleCheck(){
    const calle = document.querySelector('.calle');
    if (!inputCalle.checkValidity()) {
        calle.classList.remove('d-none');
        inputCalle.classList.add('is-invalid');
        envCalleAlert = false;
    } else {
        calle.classList.add('d-none');
        inputCalle.classList.remove('is-invalid');
        envCalleAlert = true;
    }
}


function numTarjCred(){
    const numeroTarjeta = document.querySelector('.credito-numero');
    const warningNumTarj = document.querySelector('.warning-credito-numero')
    if(!numeroTarjeta.checkValidity()){
        warningNumTarj.classList.remove('d-none')
        numeroTarjeta.classList.add('is-invalid');
        numTarjeAlert = false;
    }
    else{
        warningNumTarj.classList.add('d-none', 'd-block')
        numeroTarjeta.classList.remove('is-invalid');
        numTarjeAlert = true;
    }
}


function cvvTarjCred(){
    const cvvTarjeta = document.querySelector('.credito-cvv');
    const warningCvvTarj = document.querySelector('.warning-credito-cvv');
    if(!cvvTarjeta.checkValidity()){
        warningCvvTarj.classList.remove('d-none')
        cvvTarjeta.classList.add('is-invalid');
        cvvTarjeAlert = false;
    }
    else{
        warningCvvTarj.classList.add('d-none')
        cvvTarjeta.classList.remove('is-invalid');
        cvvTarjeAlert = true;
    }
}


function vencimientoTarjCred(){
    const vencimientoTarjeta = document.querySelector('.credito-vencimiento');
    const warningVenciTarj = document.querySelector('.warning-credito-vencimiento');
    if(!vencimientoTarjeta.checkValidity()){
        warningVenciTarj.classList.remove('d-none')
        vencimientoTarjeta.classList.add('is-invalid');
        vencTarjeAlert = false;
    }
    else{
        warningVenciTarj.classList.add('d-none')
        vencimientoTarjeta.classList.remove('is-invalid');
        vencTarjeAlert = true;
    }
}


function modal(){
    const transBancaria = document.querySelector('.metodo-pago-dos');
    const tarjCredito = document.querySelector('.metodo-pago-uno');
    const metodoPago = document.querySelector('.warning-tarjetaCredito');
    const transNum = document.querySelector('.transferencia-numero');
    const transWarningNum = document.querySelector('.warning-transferencia-numero');
    

    if(!transBancaria.checked && !tarjCredito.checked){
        metodoPago.classList.remove('d-none')
        numTarjeAlert = false;
        cvvTarjeAlert = false;
        vencTarjeAlert = false;
        modalAlert = false;
    }
    else{
        if(tarjCredito.checked){
            metodoPago.classList.add('d-none')
            numTarjCred();
            cvvTarjCred();
            vencimientoTarjCred();
            transNum.classList.remove('is-invalid');
            transWarningNum.classList.add('d-none');
            modalAlert = true;
            if( numTarjeAlert == false ||
                cvvTarjeAlert == false ||
                vencTarjeAlert == false){
                compCamposWarning.classList.remove('d-none');
            }
            else{compCamposWarning.classList.add('d-none');}
        }
        if(transBancaria.checked){
            if(transNum.value.trim() === ''){
                metodoPago.classList.add('d-none')
                transNum.classList.add('is-invalid');
                transWarningNum.classList.remove('d-none');
                modalAlert = false;
                compCamposWarning.classList.remove('d-none');
            }
            else{
                metodoPago.classList.add('d-none')
                transNum.classList.remove('is-invalid');
                transWarningNum.classList.add('d-none');
                modalAlert = true;
                numTarjeAlert = true;
                cvvTarjeAlert = true;
                vencTarjeAlert = true;
                compCamposWarning.classList.add('d-none');
            }
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
            tipoEnvioAlert = true
        }
        if(!inputGroupPress){
            tipoEnvio.classList.remove('d-none', 'd-block');
            tipoEnvioAlert = false
        }
    }
    grupodeinputs()

    envioCalleCheck();
    envioEsqCheck();
    envioNumCheck();

    modal()

    console.log(envEsquinaAlert)
    console.log(envNumAlert)
    console.log(envCalleAlert)
    console.log(cvvTarjeAlert)
    console.log(vencTarjeAlert)
    console.log(modalAlert)
    console.log(tipoEnvioAlert)

    function alert(){
        const alert = document.querySelector("#alert-compra");
        if(
            envEsquinaAlert == true &&
            envNumAlert == true &&
            envCalleAlert == true && 
            cvvTarjeAlert == true &&
            vencTarjeAlert == true && 
            modalAlert == true && 
            tipoEnvioAlert == true
        ){
            alert.innerHTML +=`
            <div class="alert alert-success" role="alert">
            ¡Has comprado con éxito!
          </div>
            `
        }
    }
    alert()

})

