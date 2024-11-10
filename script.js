// Handle signup form submission
if (document.getElementById("signup-form")) {
    document.getElementById("signup-form").addEventListener("submit", async function(event) {
        event.preventDefault();
        const username = document.getElementById("signup-username").value;
        const password = document.getElementById("signup-password").value;

        try {
            const response = await fetch("/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            alert(data.message);
            if (response.ok) {
                window.location.href = "login.html";
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
}

// Handle login form submission
if (document.getElementById("login-form")) {
    document.getElementById("login-form").addEventListener("submit", async function(event) {
        event.preventDefault();
        const username = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;

        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (response.ok) {
                // Save username in localStorage and redirect to welcome page
                localStorage.setItem("username", data.username);
                window.location.href = "welcome.html";
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
}
