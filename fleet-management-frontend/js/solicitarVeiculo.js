document.addEventListener("DOMContentLoaded", () => {
    // 🔥 Carregar lista de carros com placa e modelo
    fetch("http://localhost:3000/api/carros")
        .then(response => response.json())
        .then(data => {
            const selectCarro = document.getElementById("carroPlaca");
            selectCarro.innerHTML = data.map(carro => `
                <option value="${carro.placa}">${carro.placa} - ${carro.modelo}</option>
            `).join("");
        })
        .catch(error => console.error("❌ Erro ao carregar veículos:", error));

    // 🔥 Carregar lista de motoristas com nome e telefone
    fetch("http://localhost:3000/api/motoristas")
        .then(response => response.json())
        .then(data => {
            const selectMotorista = document.getElementById("motoristaId");
            selectMotorista.innerHTML = data.map(motorista => `
                <option value="${motorista.id}">${motorista.nome} - 📞 ${motorista.telefone}</option>
            `).join("");
        })
        .catch(error => console.error("❌ Erro ao carregar motoristas:", error));
});

document.getElementById("solicitarForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // 🔥 Evita o recarregamento da página

    const gestorId = document.getElementById("gestorId").value;
    const motoristaId = document.getElementById("motoristaId").value;
    const telefoneMotorista = document.getElementById("telefoneMotorista").value;
    const carroPlaca = document.getElementById("carroPlaca").value; // 🔥 Agora usa PLACA!
    const odometroAtual = document.getElementById("odometroAtual").value;

    const data = { gestorId, motoristaId, telefoneMotorista, carroPlaca, odometroAtual };

    const mensagemDiv = document.getElementById("mensagemConfirmacao");

    try {
        const response = await fetch("http://localhost:3000/api/eventos/solicitar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const resultado = await response.json();

        if (response.ok) {
            mensagemDiv.textContent = `✅ Veículo ${carroPlaca} solicitado com sucesso!`;
            mensagemDiv.style.color = "green";
        } else {
            mensagemDiv.textContent = `❌ Erro: ${resultado.error || "Verifique os dados!"}`;
            mensagemDiv.style.color = "red";
        }

        mensagemDiv.style.display = "block"; 
    } catch (error) {
        console.error("❌ Erro ao conectar com o servidor!", error);
        mensagemDiv.textContent = "❌ Erro ao conectar com o servidor!";
        mensagemDiv.style.color = "red";
        mensagemDiv.style.display = "block";
    }
});