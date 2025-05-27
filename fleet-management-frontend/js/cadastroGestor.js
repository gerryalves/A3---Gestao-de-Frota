document.getElementById("cadastroForm").addEventListener("submit", async (event) => {
    event.preventDefault(); 

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("emailCadastro").value;
    const senha = document.getElementById("senhaCadastro").value;

    const mensagemDiv = document.getElementById("mensagemCadastro");

    try {
        const response = await fetch("http://localhost:3000/api/gestor/cadastro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email, senha })
        });

        const data = await response.json();

        if (response.ok) {
            mensagemDiv.textContent = "✅ Cadastro realizado com sucesso!";
            mensagemDiv.style.color = "green";
            setTimeout(() => {
                window.location.href = "login.html"; // 🔥 Redireciona para login após cadastro
            }, 2000);
        } else {
            mensagemDiv.textContent = "❌ Erro ao cadastrar! Tente novamente.";
            mensagemDiv.style.display = "block";
        }
    } catch (error) {
        console.error("❌ Erro ao conectar com o servidor:", error);
        mensagemDiv.textContent = "❌ Erro ao conectar com o servidor!";
        mensagemDiv.style.display = "block";
    }
});