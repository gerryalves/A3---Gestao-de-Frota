document.addEventListener("DOMContentLoaded", () => {
    atualizarTabela();

    function atualizarTabela() {
        fetch("http://localhost:3000/api/motoristas")
            .then(response => response.json())
            .then(data => {
                const tbody = document.querySelector("#motoristasTable tbody");
                tbody.innerHTML = data.map(motorista => `
                    <tr>
                        <td style="text-align: center;">${motorista.id}</td>
                        <td>${motorista.nome}</td>
                        <td>${motorista.telefone}</td>
                        <td style="text-align: center;">
                            <button class="editarBtn" data-id="${motorista.id}" data-nome="${motorista.nome}" data-telefone="${motorista.telefone}">✏️</button>
                            <button class="excluirBtn" data-id="${motorista.id}">🗑️</button>
                        </td>
                    </tr>
                `).join("");

                // Adiciona evento de clique para edição
                document.querySelectorAll(".editarBtn").forEach(btn => {
                    btn.addEventListener("click", () => {
                        const id = btn.getAttribute("data-id");
                        const nome = btn.getAttribute("data-nome");
                        const telefone = btn.getAttribute("data-telefone");

                        // Preenche os campos do formulário com os dados atuais
                        document.getElementById("nomeMotorista").value = nome;
                        document.getElementById("telefoneMotorista").value = telefone;

                        // Atualiza o evento de submissão do formulário para editar
                        document.getElementById("addMotoristaForm").onsubmit = (e) => {
                            e.preventDefault();
                            editarMotorista(id);
                        };
                    });
                });

                // Adiciona evento de clique para exclusão
                document.querySelectorAll(".excluirBtn").forEach(btn => {
                    btn.addEventListener("click", () => {
                        const id = btn.getAttribute("data-id");
                        excluirMotorista(id);
                    });
                });
            })
            .catch(error => console.error("❌ Erro ao atualizar tabela de motoristas:", error));
    }

    function editarMotorista(id) {
        const nome = document.getElementById("nomeMotorista").value;
        const telefone = document.getElementById("telefoneMotorista").value;

        fetch(`http://localhost:3000/api/motoristas/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, telefone })
        })
        .then(response => response.json())
        .then(data => {
            console.log("✅ Motorista editado com sucesso:", data);
            atualizarTabela(); // Atualiza a tabela automaticamente
            document.getElementById("addMotoristaForm").reset(); // Limpa os campos do formulário
            document.getElementById("addMotoristaForm").onsubmit = adicionarMotorista; // Restaurar função padrão do formulário
        })
        .catch(error => console.error("❌ Erro ao editar motorista:", error));
    }

    function excluirMotorista(id) {
        if (!confirm("Tem certeza que deseja excluir este motorista?")) return;

        fetch(`http://localhost:3000/api/motoristas/${id}`, { method: "DELETE" })
        .then(response => response.json())
        .then(data => {
            console.log("🗑️ Motorista excluído com sucesso:", data);
            atualizarTabela(); // Atualiza a tabela automaticamente
        })
        .catch(error => console.error("❌ Erro ao excluir motorista:", error));
    }

    function adicionarMotorista(e) {
        e.preventDefault();
        const nome = document.getElementById("nomeMotorista").value;
        const telefone = document.getElementById("telefoneMotorista").value;

        fetch("http://localhost:3000/api/motoristas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, telefone })
        })
        .then(response => response.json())
        .then(data => {
            console.log("✅ Motorista adicionado com sucesso:", data);
            atualizarTabela(); // Atualiza a tabela automaticamente
            document.getElementById("addMotoristaForm").reset(); // Limpa os campos do formulário
        })
        .catch(error => console.error("❌ Erro ao adicionar motorista:", error));
    }

    document.getElementById("addMotoristaForm").addEventListener("submit", adicionarMotorista);
});