// Elements
const container = document.querySelector('#cart');
const subtotalTotal = document.getElementById('subtotalSum');
const deliveryCost = document.getElementById("deliveryCost")
const deliveryMethod = document.getElementById("deliveryMethod")
const purchaseTotal = document.getElementById("purchaseTotal");

// Retrieve and parse purchased products from localStorage 
const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];


// FUNCTIONS 
// Updates subtotal of a product
function updateSubtotal(id) {
    const input = document.getElementById(id);
    const subtotal = document.getElementById(`subtotal_${id}`);
    const product = cartProducts.find(p => p.id === id);
    const newSubtotal = product.unitCost * input.value;
    subtotal.textContent = product.currency + ' ' + newSubtotal;
    subtotalTotal.innerHTML = `USD ${totalSubtotal()}`
    prodDelivery();
    totalTotal();
}

// Disable alternative payment method based on selection 
function disableAlternativeMethod(){
const checkboxOne = document.querySelector(".payment-method-one");
const checkboxTwo = document.querySelector(".payment-method-two");
const credit = document.querySelectorAll('.credit-card');
const transfer = document.querySelector('.transfer')
if(checkboxOne.checked){
    credit.forEach(element =>{
        element.disabled = false;
        element.classList.toggle('pe-none');
        element.removeAttribute("aria-disabled")
        element.value = ""
        element.style.backgroundColor = 'white'
    })
    transfer.disabled = true;
    transfer.classList.add('pe-none');
    transfer.setAttribute("aria-disabled", "true")
    transfer.value = ""
    transfer.style.backgroundColor = 'lightcyan'
}
if(checkboxTwo.checked){
    transfer.classList.toggle('pe-none');
    transfer.removeAttribute("aria-disabled");
    transfer.disabled = false;
    transfer.style.backgroundColor = 'white'
    credit.forEach(element =>{
        element.disabled = true;
        element.classList.add('pe-none');
        element.setAttribute("aria-disabled", "true")
        element.value = ""
        element.style.backgroundColor = 'lightcyan'
    })
}
}

// Delete product functionality
function deleteProduct(classNm){
    const classes = classNm.className.split(' ');
    const firstClass = classes[0];
    const div = document.getElementById(`container-${firstClass}`)
    div.remove()
    let products = JSON.parse(localStorage.getItem('cartProducts'));
    const position = products.findIndex(product => product.id === parseInt(firstClass));
    products.splice(position, 1)
    localStorage.setItem('cartProducts', JSON.stringify(products));
    subtotalTotal.innerHTML = `USD ${totalSubtotal()}`
    prodDelivery();
    totalTotal();
}

// Calculates the total subtotal of the purchase
function totalSubtotal() {
    const subtotals = container.querySelectorAll(".subtotal");
    let total = 0;
    let price = 0;

    subtotals.forEach(subtotal => {
       let text = subtotal.textContent;
       let num = parseInt(text.slice(4));

       if(text.includes('UYU')) {
        price = num / 40;
       } else {
        price = num;
       }

       total += price;
    })
    total = Math.trunc(total);

    return total
}

// Calculates delivery cost 
function prodDelivery(){
    const premium = document.getElementById("option1")
    const express = document.getElementById("option2")
    const standard = document.getElementById("option3")

    let total = parseInt(subtotalTotal.textContent.slice(4))

    if (premium.checked){
       deliveryCost.innerHTML = `USD ${Math.trunc(total * 0.15)}`         
    } else if (express.checked){
        deliveryCost.innerHTML = `USD ${Math.trunc(total * 0.07)}`
    } else if (standard.checked) {
        deliveryCost.innerHTML = `USD ${Math.trunc(total * 0.05)}`
    }
}
 
// Calculates total cost of purchase
function totalTotal() {
    const num1 = parseInt(subtotalTotal.textContent.slice(4));
    const num2 = parseInt(deliveryCost.textContent.slice(4));

    let sumTotal = num1 + num2;

    purchaseTotal.innerHTML = `USD ${sumTotal}`;
}

// Load pre-loaded item into cart and update subtotal
fetch(CART_INFO_URL + "25801.json")
.then(response => response.json())
.then(data => {
    cartProducts.push(data.articles[0])
    
    for(let i=0; i<cartProducts.length; i++) {
        container.innerHTML +=`
        <div id="container-${cartProducts[i].id}" class="row">
        <div class="col"><img class="" src="${cartProducts[i].image}" style="width: 4rem"></div>
        <div class="col">${cartProducts[i].name}</div>
        <div class="col">${cartProducts[i].currency} ${cartProducts[i].unitCost}</div>
        <div class="col"><input id="${cartProducts[i].id}" type="number" min="1" style="width:60px" value="${cartProducts[i].count}" onchange="updateSubtotal(${cartProducts[i].id})"></div>
        <div class="col subtotal" id="subtotal_${cartProducts[i].id}">${cartProducts[i].currency} ${cartProducts[i].unitCost}</div>
        <div class="col"><span class="${cartProducts[i].id} bi bi-trash" onclick="deleteProduct(this)"></span></div>
        <br><br>
        <hr>
        </div>`;
        updateSubtotal(cartProducts[i].id);
    }
    subtotalTotal.innerHTML = `USD ${totalSubtotal()}`
    totalTotal();
    
})

disableAlternativeMethod();

// Event handler for the delivery method 
const deliveryMethods = deliveryMethod.querySelectorAll("input");
deliveryMethods.forEach(delivery => {
    delivery.addEventListener("click", () => {
        prodDelivery();
        totalTotal();
    })
})


// CHECK VALIDITY OF INPUTS FUNCTIONALITY
const inputGroup = document.querySelectorAll('.input-group-delivery');
const finalizePurchase = document.querySelector('.finish-button');
const inputStreet = document.querySelector('.input-street');
const inputNum = document.querySelector('.input-num');
const inputCorner = document.querySelector('.input-corner');
const compFieldsWarning = document.querySelector('.warning-complete-fields');

let delivCornerAlert = false;
let delivNumAlert = false;
let delivStreetAlert = false;
let numCreditCardAlert = true;
let cvvCreditCardAlert = true;
let expirCreditCardAlert = true;
let modalAlert = true;
let deliveryMethodAlert = false;

// Input validation functions
function deliveryCornerCheck(){
    const corner = document.querySelector('.corner');
    if (!inputCorner.checkValidity()) {
        corner.classList.remove('d-none');
        inputCorner.classList.add('is-invalid');
        delivCornerAlert = false;
    } else {
        corner.classList.add('d-none');
        inputCorner.classList.remove('is-invalid');
        delivCornerAlert = true;
    }
}
  

function deliveryNumCheck(){
    const number = document.querySelector('.number');
    if (!inputNum.checkValidity()) {
        number.classList.remove('d-none');
        inputNum.classList.add('is-invalid');
        delivNumAlert = false;
    } else {
        number.classList.add('d-none');
        inputNum.classList.remove('is-invalid');
        delivNumAlert = true;
        console.log(delivNumAlert)
    }
}


function deliveryStreetCheck(){
    const street = document.querySelector('.street');
    if (!inputStreet.checkValidity()) {
        street.classList.remove('d-none');
        inputStreet.classList.add('is-invalid');
        delivStreetAlert = false;
    } else {
        street.classList.add('d-none');
        inputStreet.classList.remove('is-invalid');
        delivStreetAlert = true;
    }
}


function numCreditCard(){
    const creditCardNumber = document.querySelector('.credit-card-number');
    const warningCreditCardNum = document.querySelector('.warning-credit-card-number')
    if(!creditCardNumber.checkValidity()){
        warningCreditCardNum.classList.remove('d-none')
        creditCardNumber.classList.add('is-invalid');
        numCreditCardAlert = false;
    }
    else{
        warningCreditCardNum.classList.add('d-none', 'd-block')
        creditCardNumber.classList.remove('is-invalid');
        numCreditCardAlert = true;
    }
}


function cvvCreditCard(){
    const cvvCreditCard = document.querySelector('.credit-card-cvv');
    const warningCvvCreditCard = document.querySelector('.warning-credit-card-cvv');
    if(!cvvCreditCard.checkValidity()){
        warningCvvCreditCard.classList.remove('d-none')
        cvvCreditCard.classList.add('is-invalid');
        cvvCreditCardAlert = false;
    }
    else{
        warningCvvCreditCard.classList.add('d-none')
        cvvCreditCard.classList.remove('is-invalid');
        cvvCreditCardAlert = true;
    }
}


function expirationCreditCard(){
    const creditCardExpir = document.querySelector('.credit-card-expir');
    const warningExpirCreditCard = document.querySelector('.warning-credit-card-expir');
    if(!creditCardExpir.checkValidity()){
        warningExpirCreditCard.classList.remove('d-none')
        creditCardExpir.classList.add('is-invalid');
        expirCreditCardAlert = false;
    }
    else{
        warningExpirCreditCard.classList.add('d-none')
        creditCardExpir.classList.remove('is-invalid');
        expirCreditCardAlert = true;
    }
}


function modal(){
    const bankTransfer = document.querySelector('.payment-method-two');
    const creditCard = document.querySelector('.payment-method-one');
    const paymentMethod = document.querySelector('.warning-credit-card');
    const transNum = document.querySelector('.transfer-number');
    const transWarningNum = document.querySelector('.warning-transfer-number');
    

    if(!bankTransfer.checked && !creditCard.checked){
        paymentMethod.classList.remove('d-none')
        numCreditCardAlert = false;
        cvvCreditCardAlert = false;
        expirCreditCardAlert = false;
        modalAlert = false;
    }
    else{
        if(creditCard.checked){
            paymentMethod.classList.add('d-none')
            numCreditCard();
            cvvCreditCard();
            expirationCreditCard();
            transNum.classList.remove('is-invalid');
            transWarningNum.classList.add('d-none');
            modalAlert = true;
            if( numCreditCardAlert == false ||
                cvvCreditCardAlert == false ||
                expirCreditCardAlert == false){
                compFieldsWarning.classList.remove('d-none');
            }
            else{compFieldsWarning.classList.add('d-none');}
        }
        if(bankTransfer.checked){
            if(transNum.value.trim() === ''){
                paymentMethod.classList.add('d-none')
                transNum.classList.add('is-invalid');
                transWarningNum.classList.remove('d-none');
                modalAlert = false;
                compFieldsWarning.classList.remove('d-none');
            }
            else{
                paymentMethod.classList.add('d-none')
                transNum.classList.remove('is-invalid');
                transWarningNum.classList.add('d-none');
                modalAlert = true;
                numCreditCardAlert = true;
                cvvCreditCardAlert = true;
                expirCreditCardAlert = true;
                compFieldsWarning.classList.add('d-none');
            }
        }
    }
}


// Resume purchase functionality
finalizePurchase.addEventListener('click',function(){
    let inputGroupPress = false;
    inputGroup.forEach(button=>{
        if (button.checked) {
            inputGroupPress = true;
        }  
    })
    
    function groupOfInputs(){
        const deliveryMethod = document.querySelector('.delivery-method');
        if(inputGroupPress){
            deliveryMethod.classList.toggle('d-none', 'd-block');
            deliveryMethodAlert = true
        }
        if(!inputGroupPress){
            deliveryMethod.classList.remove('d-none', 'd-block');
            deliveryMethodAlert = false
        }
    }
    groupOfInputs()

    deliveryStreetCheck();
    deliveryCornerCheck();
    deliveryNumCheck();

    modal()

    console.log(delivCornerAlert)
    console.log(delivNumAlert)
    console.log(delivStreetAlert)
    console.log(cvvCreditCardAlert)
    console.log(expirCreditCardAlert)
    console.log(modalAlert)
    console.log(deliveryMethodAlert)

    function alert(){
        const alert = document.querySelector("#purchaseAlert");
        if(
            delivCornerAlert == true &&
            delivNumAlert == true &&
            delivStreetAlert == true && 
            cvvCreditCardAlert == true &&
            expirCreditCardAlert == true && 
            modalAlert == true && 
            deliveryMethodAlert == true
        ){
            alert.innerHTML +=`
            <div class="alert alert-success" role="alert">
            ¡Has comprado con éxito!
          </div>
            `
            setTimeout(function() {
                location.reload();
            }, 3000);
        }
    }
    alert()
})