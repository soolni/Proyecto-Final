document.addEventListener('DOMContentLoaded', function () {
  const button = document.querySelector('#save-changes');
  const imageContainer = document.getElementById('showPicture');
  const alertContainer = document.querySelector("#saveChangesAlert");

  // Inputs
  const requiredInputs = document.querySelectorAll('.required-field');
  const inputName = document.getElementById("name");
  const inputSecondName = document.getElementById("secondName");
  const inputLastname = document.getElementById("lastname");
  const inputSecondLastname = document.getElementById("second-lastname");
  const inputPhoneNumber = document.getElementById("phoneNumber");
  const inputEmail = document.getElementById("email");

  // PROFILE PICTURE FUNCTIONALITY
  const profilePicture = document.querySelector('.input-picture');

  // Show picture on page load
  showPicture();

  button.addEventListener('click', (e) => {
    e.preventDefault();

    let isValidForm = true;

    requiredInputs.forEach(element => {
      if (!element.checkValidity()) {
        element.classList.add('is-invalid');
        document.getElementById(`${element.placeholder}`).classList.remove('d-none');
        isValidForm = false;
      } else {
        element.classList.remove('is-invalid');
        document.getElementById(`${element.placeholder}`).classList.add('d-none');
        savePicture();
      }
    });

    if (isValidForm) {
      localStorage.setItem("firstName", inputName.value);
      localStorage.setItem("secondName", inputSecondName.value);
      localStorage.setItem("firstLastname", inputLastname.value);
      localStorage.setItem("secondLastname", inputSecondLastname.value);
      localStorage.setItem("phoneNumber", inputPhoneNumber.value);
      localStorage.setItem("user", inputEmail.value);

      showAlert(); 
    }
  });

  if (localStorage.getItem("firstName")) {
    inputName.setAttribute("value", localStorage.getItem("firstName"));
    inputLastname.setAttribute("value", localStorage.getItem("firstLastname"));
    inputPhoneNumber.setAttribute("value", localStorage.getItem("phoneNumber"));
    inputEmail.setAttribute("value", localStorage.getItem("user"));

    if (localStorage.getItem("secondName")) {
      inputSecondName.setAttribute("value", localStorage.getItem("secondName"));
    }
    if (localStorage.getItem("secondLastname")) {
      inputSecondLastname.setAttribute("value", localStorage.getItem("secondLastname"));
    }
  }

  let email = localStorage.getItem("user");
  inputEmail.setAttribute("value", email);

  function savePicture() {
    if (profilePicture.files && profilePicture.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const imageBase64 = e.target.result;
        localStorage.setItem('picture', imageBase64);
        console.log('Saved picture in localStorage.');
        showPicture();
      };

      reader.readAsDataURL(profilePicture.files[0]);
    } else {
      console.log('No file has been selected.');
    }
  }

  function showPicture() {
    const imageBase64 = localStorage.getItem('picture');

    imageContainer.innerHTML = "";

    if (imageBase64) {
      const img = document.createElement('img');
      img.src = imageBase64;
      img.style.maxWidth = '6rem';
      img.classList.add('float-end');

      imageContainer.appendChild(img);
    } else {
      console.log('No picture has been found in localStorage.');
    }
  }

  // Alert function
  function showAlert() {
    alertContainer.innerHTML = `
      <div class="alert alert-success" role="alert">
        ¡Cambios guardados correctamente!
      </div>
    `;

    setTimeout(function () {
      alertContainer.innerHTML = ""; 
    }, 3000);
  }
});
