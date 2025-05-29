document.getElementById("devolverForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita o recarregamento da página

    const gestorId = document.getElementById("gestorIdDev").value;
    const motoristaId = document.getElementById("motoristaIdDev").value;
    const telefoneMotorista = document.getElementById("telefoneMotoristaDev").value;
    const carroId = document.getElementById("carroIdDev").value;
    const odometroAtual = document.getElementById("odometroAtualDev").value;

    const data = { gestorId, motoristaId, telefoneMotorista, carroId, odometroAtual };

    const mensagemDiv = document.getElementById("mensagemConfirmacaoDev"); 

    try {
        const response = await fetch("http://localhost:3000/api/eventos/devolver", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            mensagemDiv.textContent = "✅ Veículo devolvido com sucesso!";
            mensagemDiv.style.color = "green";
        } else {
            mensagemDiv.textContent = "❌ Erro ao devolver veículo. Verifique os dados!";
            mensagemDiv.style.color = "red";
        }

        mensagemDiv.style.display = "block"; 
    } catch (error) {
        console.error("❌ Erro ao conectar com o servidor:", error);
        mensagemDiv.textContent = "❌ Erro ao conectar com o servidor!";
        mensagemDiv.style.color = "red";
        mensagemDiv.style.display = "block"; 
    }
});