document.addEventListener('DOMContentLoaded', function() {

const perfil = document.querySelector('#miPerfil');
const boton = document.querySelector('#save-changes');

// Inputs
const inputsObligatorios = document.querySelectorAll('.campo-obligatorio');
const inputNombre = document.getElementById("nombre");
const inputSegNombre = document.getElementById("segundo-nombre");
const inputApellido = document.getElementById("apellido");
const inputSegApellido = document.getElementById("segundo-apellido");
const inputTelefono = document.getElementById("telefono");
const inputEmail = document.getElementById("email");

let valido = true;

boton.addEventListener('click',(e)=>{
    e.preventDefault();
    inputsObligatorios.forEach( element => {
        if(!element.checkValidity()){
            element.classList.add('is-invalid');
            document.getElementById(`${element.placeholder}`).classList.remove('d-none');
            valido = false;
        }
        else{
            element.classList.remove('is-invalid');
            document.getElementById(`${element.placeholder}`).classList.add('d-none');
        }
    })

    if(valido) {
        localStorage.setItem("primerNombre", inputNombre.value)
        localStorage.setItem("segundoNombre", inputSegNombre.value)
        localStorage.setItem("primerApellido", inputApellido.value)
        localStorage.setItem("segundoApellido", inputSegApellido.value)
        localStorage.setItem("telefono", inputTelefono.value)
    }
    
})

console.log("Anda")

if(localStorage.getItem("primerNombre")) {
   inputNombre.setAttribute("value", localStorage.getItem("primerNombre"));
   inputApellido.setAttribute("value", localStorage.getItem("primerApellido"));
   inputTelefono.setAttribute("value", localStorage.getItem("telefono"));

   if(localStorage.getItem("segundoNombre")) {
    inputSegNombre.setAttribute("value", localStorage.getItem("segundoNombre"));
   }
   if(localStorage.getItem("segundoApellido")) {
    inputSegApellido.setAttribute("value", localStorage.getItem("segundoApellido"))
   }
}

let email = localStorage.getItem("usuario");

inputEmail.setAttribute("value", email);

});

