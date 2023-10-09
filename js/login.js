document.getElementById("formularioLogin").addEventListener("submit", (e) => {
    e.preventDefault();
    }) 
    
    const submit = document.getElementById("access");
    
    submit.addEventListener("click", () => {
        const usuario = document.querySelector("#floatingInput").value;
        const contraseña = document.querySelector("#floatingPassword").value;

        if (usuario && contraseña) {
            localStorage.setItem("usuario", usuario);
            localStorage.setItem("autenticado", "true");
            window.location.href = "index.html";
        } 
    })


