document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault(); 

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const mensagemDiv = document.getElementById("mensagemLogin");

    try {
        const response = await fetch("http://localhost:3000/api/gestor/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token); // Guarda o token de autenticação
            window.location.href = "index.html"; // Redireciona para a tela principal
        } else {
            mensagemDiv.textContent = "❌ E-mail ou senha incorretos!";
            mensagemDiv.style.display = "block";
        }
    } catch (error) {
        console.error("❌ Erro ao conectar com o servidor:", error);
        mensagemDiv.textContent = "❌ Erro ao conectar com o servidor!";
        mensagemDiv.style.display = "block";
    }
});