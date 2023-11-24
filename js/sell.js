let productCost = 0;
let productCount = 0;
let comissionPercentage = 0.13;
let MONEY_SYMBOL = "$";
let DOLLAR_CURRENCY = "Dólares (USD)";
let PESO_CURRENCY = "Pesos Uruguayos (UYU)";
let DOLLAR_SYMBOL = "USD ";
let PESO_SYMBOL = "UYU ";
let PERCENTAGE_SYMBOL = '%';
let MSG = "FUNCIONALIDAD NO IMPLEMENTADA";

// Function used to update publication costs
function updateTotalCosts(){
    let unitProductCostHTML = document.getElementById("productCostText");
    let comissionCostHTML = document.getElementById("comissionText");
    let totalCostHTML = document.getElementById("totalCostText");

    let unitCostToShow = MONEY_SYMBOL + productCost;
    let comissionToShow = Math.round((comissionPercentage * 100)) + PERCENTAGE_SYMBOL;
    let totalCostToShow = MONEY_SYMBOL + ((Math.round(productCost * comissionPercentage * 100) / 100) + parseInt(productCost));

    unitProductCostHTML.innerHTML = unitCostToShow;
    comissionCostHTML.innerHTML = comissionToShow;
    totalCostHTML.innerHTML = totalCostToShow;
}

// Function that runs once the event is triggered
// indicating that the document has loaded, meaning all
// HTML elements are present.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("productCountInput").addEventListener("change", function(){
        productCount = this.value;
        updateTotalCosts();
    });

    document.getElementById("productCostInput").addEventListener("change", function(){
        productCost = this.value;
        updateTotalCosts();
    });

    document.getElementById("goldradio").addEventListener("change", function(){
        comissionPercentage = 0.13;
        updateTotalCosts();
    });
    
    document.getElementById("premiumradio").addEventListener("change", function(){
        comissionPercentage = 0.07;
        updateTotalCosts();
    });

    document.getElementById("standardradio").addEventListener("change", function(){
        comissionPercentage = 0.03;
        updateTotalCosts();
    });

    document.getElementById("productCurrency").addEventListener("change", function(){
        if (this.value == DOLLAR_CURRENCY)
        {
            MONEY_SYMBOL = DOLLAR_SYMBOL;
        } 
        else if (this.value == PESO_CURRENCY)
        {
            MONEY_SYMBOL = PESO_SYMBOL;
        }

        updateTotalCosts();
    });


    // Configurations for the file upload element
    let dzoptions = {
        url:"/",
        autoQueue: false
    };
    let myDropzone = new Dropzone("div#file-upload", dzoptions);    


    // Obtaining the product publishing form
    let sellForm = document.getElementById("sell-info");

    // Adding a listener for the 'submit' event that will be
    // triggered by the form when 'Sell' is selected.
    sellForm.addEventListener("submit", function(e){

        e.preventDefault(); 
        e.preventDefault();

        let productNameInput = document.getElementById("productName");
        let productCategory = document.getElementById("productCategory");
        let productCost = document.getElementById("productCostInput");
        let infoMissing = false;

        // Removing classes that mark as invalid
        productNameInput.classList.remove('is-invalid');
        productCategory.classList.remove('is-invalid');
        productCost.classList.remove('is-invalid');

        // Necessary checks are performed,
        // In this case, it is checked that the name and category have been entered.
        // Checking for the product name
        if (productNameInput.value === "")
        {
            productNameInput.classList.add('is-invalid');
            infoMissing = true;
        }
        
        // Checking for the product category
        if (productCategory.value === "")
        {
            productCategory.classList.add('is-invalid');
            infoMissing = true;
        }

        // Checking for the cost
        if (productCost.value <=0)
        {
            productCost.classList.add('is-invalid');
            infoMissing = true;
        }
        
        if(!infoMissing)
        {

            // Enters here if it passed the checks, will proceed to send
            // the request to create the publication.
            getJSONData(PUBLISH_PRODUCT_URL).then(function(resultObj){
                let msgToShowHTML = document.getElementById("resultSpan");
                let msgToShow = "";
    
                // If the publication is successful, it will return a success message,
                // otherwise, it will return an error message.
                // FUNCTIONALITY NOT IMPLEMENTED
                if (resultObj.status === 'ok')
                {
                    msgToShow = MSG;
                    document.getElementById("alertResult").classList.add('alert-primary');
                }
                else if (resultObj.status === 'error')
                {
                    msgToShow = MSG;
                    document.getElementById("alertResult").classList.add('alert-primary');
                }
    
                msgToShowHTML.innerHTML = msgToShow;
                document.getElementById("alertResult").classList.add("show");
            });
        }
    });
});