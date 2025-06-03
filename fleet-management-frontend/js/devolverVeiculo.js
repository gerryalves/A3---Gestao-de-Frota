document.addEventListener("DOMContentLoaded", () => {
    // 🔥 Carregar lista de carros com placa e modelo
    fetch("http://localhost:3000/api/carros")
        .then(response => response.json())
        .then(data => {
            const selectCarroDev = document.getElementById("carroPlacaDev");
            selectCarroDev.innerHTML = data.map(carro => `
                <option value="${carro.placa}">${carro.placa} - ${carro.modelo}</option>
            `).join("");
        })
        .catch(error => console.error("❌ Erro ao carregar veículos:", error));

    // 🔥 Carregar lista de motoristas com nome e telefone
    fetch("http://localhost:3000/api/motoristas")
        .then(response => response.json())
        .then(data => {
            const selectMotoristaDev = document.getElementById("motoristaIdDev");
            selectMotoristaDev.innerHTML = data.map(motorista => `
                <option value="${motorista.id}">${motorista.nome} - 📞 ${motorista.telefone}</option>
            `).join("");
        })
        .catch(error => console.error("❌ Erro ao carregar motoristas:", error));
});

document.getElementById("devolverForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // 🔥 Evita recarregamento da página

    const gestorIdDev = document.getElementById("gestorIdDev").value;
    const motoristaIdDev = document.getElementById("motoristaIdDev").value;
    const telefoneMotoristaDev = document.getElementById("telefoneMotoristaDev").value;
    const carroPlacaDev = document.getElementById("carroPlacaDev").value; // 🔥 Agora usa PLACA!
    const odometroAtualDev = document.getElementById("odometroAtualDev").value;

    const data = { gestorIdDev, motoristaIdDev, telefoneMotoristaDev, carroPlacaDev, odometroAtualDev };

    const mensagemDiv = document.getElementById("mensagemConfirmacaoDev");

    try {
        const response = await fetch("http://localhost:3000/api/eventos/devolver", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const resultado = await response.json();

        if (response.ok) {
            mensagemDiv.textContent = `✅ Veículo ${carroPlacaDev} devolvido com sucesso!`;
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