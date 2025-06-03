document.getElementById("relatorioVeiculosForm").addEventListener("submit", async (event) => {
    event.preventDefault(); 

    const dataInicio = document.getElementById("dataInicio").value;
    const dataFim = document.getElementById("dataFim").value;

    const mensagemDiv = document.getElementById("mensagemRelatorioVeiculos");

    try {
        const response = await fetch(`http://localhost:3000/api/eventos/uso?dataInicio=${dataInicio}&dataFim=${dataFim}`);
        const data = await response.json();

        if (!response.ok || data.length === 0) {
            throw new Error("❌ Nenhum evento encontrado para este período.");
        }

        mensagemDiv.textContent = "✅ Relatório gerado com sucesso!";
        mensagemDiv.style.color = "green";

        const tabela = document.querySelector("#relatorioVeiculos tbody");
        tabela.innerHTML = ""; // Limpa a tabela antes de preencher os novos dados

        data.forEach(evento => {
            const row = tabela.insertRow();
            row.innerHTML = `
                <td>${evento.id}</td>
                <td>${evento.gestorId}</td>
                <td>${evento.motoristaId}</td>
                <td>${evento.telefoneMotorista}</td>
                <td>${evento.carroId}</td>
                <td>${evento.odometroAtual}</td>
                <td>${evento.tipoEvento}</td>
                <td>${evento.data}</td>
            `; 
        });

        mensagemDiv.style.display = "block";
    } catch (error) {
        console.error("❌ Erro ao buscar relatório:", error);
        mensagemDiv.textContent = "❌ Erro ao gerar relatório ou nenhum evento encontrado!";
        mensagemDiv.style.color = "red";
        mensagemDiv.style.display = "block";
    }
});

document.getElementById("relatorioMotoristaForm").addEventListener("submit", async (event) => {
    event.preventDefault(); 

    const motoristaId = document.getElementById("motoristaIdRelatorio").value;
    const dataInicio = document.getElementById("dataInicioMotorista").value;
    const dataFim = document.getElementById("dataFimMotorista").value;

    const mensagemDiv = document.getElementById("mensagemRelatorioMotorista");

    try {
        const response = await fetch(`http://localhost:3000/api/eventos/motorista?motoristaId=${motoristaId}&dataInicio=${dataInicio}&dataFim=${dataFim}`);
        const data = await response.json();

        if (!response.ok || data.length === 0) {
            throw new Error("❌ Nenhum evento encontrado para este período.");
        }

        mensagemDiv.textContent = "✅ Relatório gerado com sucesso!";
        mensagemDiv.style.color = "green";

        const tabela = document.querySelector("#relatorioMotorista tbody");
        tabela.innerHTML = ""; // Limpa a tabela antes de preencher os novos dados

        data.forEach(evento => {
            const row = tabela.insertRow();
            row.innerHTML = `
                <td>${evento.id}</td>
                <td>${evento.motoristaId}</td>
                <td>${evento.telefoneMotorista}</td>
                <td>${evento.carroId}</td>
                <td>${evento.odometroAtual}</td>
                <td>${evento.tipoEvento}</td>
                <td>${evento.data}</td>
            `; 
        });

        mensagemDiv.style.display = "block";
    } catch (error) {
        console.error("❌ Erro ao buscar relatório:", error);
        mensagemDiv.textContent = "❌ Erro ao gerar relatório ou nenhum evento encontrado!";
        mensagemDiv.style.color = "red";
        mensagemDiv.style.display = "block";
    }
});