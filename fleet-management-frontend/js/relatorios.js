document.getElementById("relatorioVeiculosForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita o recarregamento da página

    const dataInicio = document.getElementById("dataInicio").value;
    const dataFim = document.getElementById("dataFim").value;

    const mensagemDiv = document.getElementById("mensagemRelatorioVeiculos");

    try {
        const response = await fetch(`http://localhost:3000/api/eventos/uso?dataInicio=${dataInicio}&dataFim=${dataFim}`);

        if (!response.ok) {
            throw new Error("❌ Erro ao buscar relatório de veículos!");
        }

        const data = await response.json();

        mensagemDiv.textContent = "✅ Relatório gerado com sucesso!";
        mensagemDiv.style.color = "green";

        const tabela = document.getElementById("relatorioVeiculos").getElementsByTagName("tbody")[0];
        tabela.innerHTML = ""; // Limpa a tabela antes de preencher os novos dados

        data.forEach(evento => {
            const row = tabela.insertRow();
            row.innerHTML = `<td>${evento.id}</td><td>${evento.gestorId}</td><td>${evento.motoristaId}</td><td>${evento.carroId}</td><td>${evento.data}</td><td>${evento.tipoEvento}</td>`; // 🔥 Corrigido para `data`
        });

        mensagemDiv.style.display = "block";
    } catch (error) {
        console.error("❌ Erro ao buscar relatório:", error);
        mensagemDiv.textContent = "❌ Erro ao conectar com o servidor!";
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

        if (!response.ok) {
            throw new Error("❌ Erro ao buscar relatório do motorista!");
        }

        const data = await response.json();

        mensagemDiv.textContent = "✅ Relatório gerado com sucesso!";
        mensagemDiv.style.color = "green";

        const tabela = document.getElementById("relatorioMotorista").getElementsByTagName("tbody")[0];
        tabela.innerHTML = ""; // Limpa a tabela antes de preencher os novos dados

        data.forEach(evento => {
            const row = tabela.insertRow();
            row.innerHTML = `<td>${evento.id}</td><td>${evento.motoristaId}</td><td>${evento.carroId}</td><td>${evento.data}</td><td>${evento.tipoEvento}</td>`; // 🔥 Corrigido para `data`
        });

        mensagemDiv.style.display = "block";
    } catch (error) {
        console.error("❌ Erro ao buscar relatório:", error);
        mensagemDiv.textContent = "❌ Erro ao conectar com o servidor!";
        mensagemDiv.style.color = "red";
        mensagemDiv.style.display = "block";
    }
});