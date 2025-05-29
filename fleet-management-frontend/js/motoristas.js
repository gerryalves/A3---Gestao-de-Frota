document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/api/motoristas")
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector("#motoristasTable tbody");
            tbody.innerHTML = data.map(motorista => `
                <tr>
                    <td>${motorista.id}</td>
                    <td>${motorista.nome}</td>
                    <td>${motorista.telefone}</td>
                </tr>
            `).join("");
        })
        .catch(error => console.error("Erro ao carregar motoristas:", error));
});