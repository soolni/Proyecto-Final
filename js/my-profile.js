document.addEventListener('DOMContentLoaded', function() {

const profile = document.querySelector('#miPerfil');
const buton = document.querySelector('#save-changes');
const inputsObligatorios = document.querySelectorAll('.campo-obligatorio');


buton.addEventListener('click',(e)=>{
    inputsObligatorios.forEach( element => {
        if(!element.checkValidity()){
            e.preventDefault()
            element.classList.add('is-invalid');
            document.getElementById(`${element.placeholder}`).classList.remove('d-none');
        }
        else{
            element.classList.remove('is-invalid');
            document.getElementById(`${element.placeholder}`).classList.add('d-none');
        }
    })
})

});