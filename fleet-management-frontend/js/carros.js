document.addEventListener("DOMContentLoaded", () => {
    atualizarTabela();

    function atualizarTabela() {
        fetch("http://localhost:3000/api/carros")
            .then(response => response.json())
            .then(data => {
                const tbody = document.querySelector("#carrosTable tbody");
                tbody.innerHTML = data.map(carro => `
                    <tr>
                        <td style="text-align: center;">${carro.id}</td>
                        <td>${carro.modelo}</td>
                        <td>${carro.placa}</td>
                        <td style="text-align: center;">${carro.disponivel ? "✅ Sim" : "❌ Não"}</td>
                        <td style="text-align: center;">
                            <button class="editarBtn" data-id="${carro.id}" data-modelo="${carro.modelo}" data-placa="${carro.placa}">✏️</button>
                            <button class="excluirBtn" data-id="${carro.id}">🗑️</button>
                        </td>
                    </tr>
                `).join("");

                // Adiciona evento de clique para edição
                document.querySelectorAll(".editarBtn").forEach(btn => {
                    btn.addEventListener("click", () => {
                        const id = btn.getAttribute("data-id");
                        const modelo = btn.getAttribute("data-modelo");
                        const placa = btn.getAttribute("data-placa");

                        // Preenche os campos do formulário com os dados atuais
                        document.getElementById("modeloCarro").value = modelo;
                        document.getElementById("placaCarro").value = placa;

                        // Atualiza o evento de submissão do formulário para editar
                        document.getElementById("addCarroForm").onsubmit = (e) => {
                            e.preventDefault();
                            editarCarro(id);
                        };
                    });
                });

                // Adiciona evento de clique para exclusão
                document.querySelectorAll(".excluirBtn").forEach(btn => {
                    btn.addEventListener("click", () => {
                        const id = btn.getAttribute("data-id");
                        excluirCarro(id);
                    });
                });
            })
            .catch(error => console.error("❌ Erro ao atualizar tabela de carros:", error));
    }

    function editarCarro(id) {
        const modelo = document.getElementById("modeloCarro").value;
        const placa = document.getElementById("placaCarro").value;

        fetch(`http://localhost:3000/api/carros/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ modelo, placa })
        })
        .then(response => response.json())
        .then(data => {
            console.log("✅ Carro editado com sucesso:", data);
            atualizarTabela(); // Atualiza a tabela automaticamente
            document.getElementById("addCarroForm").reset(); // Limpa os campos do formulário
            document.getElementById("addCarroForm").onsubmit = adicionarCarro; // Restaurar função padrão do formulário
        })
        .catch(error => console.error("❌ Erro ao editar carro:", error));
    }

    function excluirCarro(id) {
        if (!confirm("Tem certeza que deseja excluir este carro?")) return;

        fetch(`http://localhost:3000/api/carros/${id}`, { method: "DELETE" })
        .then(response => response.json())
        .then(data => {
            console.log("🗑️ Carro excluído com sucesso:", data);
            atualizarTabela(); // Atualiza a tabela automaticamente
        })
        .catch(error => console.error("❌ Erro ao excluir carro:", error));
    }

    function adicionarCarro(e) {
        e.preventDefault();
        const modelo = document.getElementById("modeloCarro").value;
        const placa = document.getElementById("placaCarro").value;

        fetch("http://localhost:3000/api/carros", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ modelo, placa })
        })
        .then(response => response.json())
        .then(data => {
            console.log("✅ Carro adicionado com sucesso:", data);
            atualizarTabela(); // Atualiza a tabela automaticamente
            document.getElementById("addCarroForm").reset(); // Limpa os campos do formulário
        })
        .catch(error => console.error("❌ Erro ao adicionar carro:", error));
    }

    document.getElementById("addCarroForm").addEventListener("submit", adicionarCarro);
});