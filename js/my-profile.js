document.addEventListener('DOMContentLoaded', function() {

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
            guardarImagen()
        }
    })

    if(valido) {
        localStorage.setItem("primerNombre", inputNombre.value)
        localStorage.setItem("segundoNombre", inputSegNombre.value)
        localStorage.setItem("primerApellido", inputApellido.value)
        localStorage.setItem("segundoApellido", inputSegApellido.value)
        localStorage.setItem("telefono", inputTelefono.value)
        localStorage.setItem("usuario", inputEmail.value)
    }
    
})


if(localStorage.getItem("primerNombre")) {
   inputNombre.setAttribute("value", localStorage.getItem("primerNombre"));
   inputApellido.setAttribute("value", localStorage.getItem("primerApellido"));
   inputTelefono.setAttribute("value", localStorage.getItem("telefono"));
   inputEmail.setAttribute("value", localStorage.getItem("usuario"))

   if(localStorage.getItem("segundoNombre")) {
    inputSegNombre.setAttribute("value", localStorage.getItem("segundoNombre"));
   }
   if(localStorage.getItem("segundoApellido")) {
    inputSegApellido.setAttribute("value", localStorage.getItem("segundoApellido"))
   }
}

let email = localStorage.getItem("usuario");

inputEmail.setAttribute("value", email);


const imagenPerfil = document.querySelector('.input-imagen');
function guardarImagen() {
    
    if (imagenPerfil.files && imagenPerfil.files[0]) {
      const reader = new FileReader();
  
      reader.onload = function (e) {
        const imagenBase64 = e.target.result;
        localStorage.setItem('imagen', imagenBase64);
        console.log('Imagen guardada en el localStorage.');
        mostrarImagen()
      };
  
      reader.readAsDataURL(imagenPerfil.files[0]);
    } else {
      console.log('No se ha seleccionado ningún archivo.');
    }
  }
  mostrarImagen()


function mostrarImagen(){

    const imagenBase64 = localStorage.getItem('imagen');

    if (imagenBase64) {
    const img = document.createElement('img');
    const defaultImagen = document.querySelector('#imagen-perfil-default');  
    defaultImagen.remove()

    img.src = imagenBase64;
    img.style.maxWidth = '6rem';
    img.classList.add('float-end')
    
    const imageContainer = document.getElementById('mostrar-imagen');
    imageContainer.appendChild(img);
    } else {
    console.log('No se ha encontrado ninguna imagen en el localStorage.');
    }
 
}

});



