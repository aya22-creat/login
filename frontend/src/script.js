document.addEventListener("DOMContentLoaded", function () {
    const userForm = document.getElementById("registerForm"); 
    const message = document.getElementById("message");

    userForm.addEventListener("submit", async function (event) {
        event.preventDefault();  

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();

        if (!name || !email) {
            message.innerText = "Please enter all required fields!";
            message.style.color = "red";
            return;
        }

        try {
            const response = await fetch("http://localhost:2001/login", {  
                method: "POST",  
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email }) 
            });

            const data = await response.json();

            if (response.ok) {
                message.innerText = data.message || "Data saved successfully!";
                message.style.color = "green";
            } else {
                message.innerText = data.message || "An error occurred.";
                message.style.color = "red";
            }
        } catch (error) {
            console.error("Error:", error);
            message.innerText = "An error occurred while saving data!";
            message.style.color = "red";
        }
    });
});
