const form = document.getElementById("contact-form");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, message })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Something went wrong");
        }

        alert(data.message);
        form.reset();

    } catch (error) {
        console.error("Error:", error.message);
        alert("Server not running or database error.");
    }
});