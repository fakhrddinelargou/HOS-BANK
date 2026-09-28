const form = document.querySelector("#registerForm");
const errorsContainer = document.querySelector("#errors")
form.addEventListener("submit", async(event)=>{
    event.preventDefault();

    const first_name = document.querySelector("#first_name").value;
    const last_name = document.querySelector("#last_name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const phone = document.querySelector("#phone").value;

    const response = await fetch("/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            first_name,
            last_name,
            email,
            password,
            phone
        })
    });

    const data = await response.json();

    if(!response.ok){
        errorsContainer.textContent = data.message || "Une erreur est survenue";
        return
    }

    errorsContainer.textContent = data.message;
    form.reset();

});