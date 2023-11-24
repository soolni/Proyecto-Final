document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    }) 
    
    const submit = document.getElementById("access");
    
    submit.addEventListener("click", () => {
        const user = document.querySelector("#floatingInput").value;
        const password = document.querySelector("#floatingPassword").value;

        if (user && password) {
            localStorage.setItem("user", user);
            localStorage.setItem("authenticated", "true");
            window.location.href = "index.html";
        } 
    })


