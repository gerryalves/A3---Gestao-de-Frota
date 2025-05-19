document.getElementById("solicitarForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita o recarregamento da página

    const gestorId = document.getElementById("gestorId").value;
    const motoristaId = document.getElementById("motoristaId").value;
    const telefoneMotorista = document.getElementById("telefoneMotorista").value;
    const carroId = document.getElementById("carroId").value;
    const odometroAtual = document.getElementById("odometroAtual").value;

    const data = {
        gestorId,
        motoristaId,
        telefoneMotorista,
        carroId,
        odometroAtual
    };

    const mensagemDiv = document.getElementById("mensagemConfirmacao");

    try {
        const response = await fetch("http://localhost:3000/api/eventos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            mensagemDiv.textContent = "✅ Veículo solicitado com sucesso!";
            mensagemDiv.style.color = "green";
        } else {
            mensagemDiv.textContent = "❌ Erro ao solicitar veículo. Verifique os dados!";
            mensagemDiv.style.color = "red";
        }

        mensagemDiv.style.display = "block"; // Exibe a mensagem na tela
    } catch (error) {
        console.error("Erro ao enviar solicitação:", error);
        mensagemDiv.textContent = "❌ Erro ao conectar com o servidor!";
        mensagemDiv.style.color = "red";
        mensagemDiv.style.display = "block";
    }
});
