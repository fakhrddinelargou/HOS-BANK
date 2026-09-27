const form = document.querySelector("#loginForm");
const errorsContainer = document.querySelector("#errors");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    const data = await response.json();

    if (!response.ok) {
        errorsContainer.textContent = data.message || "Erreur de connexion";
        return;
    }

    window.location.href = "/dashboard";
});