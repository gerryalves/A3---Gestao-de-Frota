document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/api/carros")
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector("#carrosTable tbody");
            tbody.innerHTML = data.map(carro => `
                <tr>
                    <td>${carro.id}</td>
                    <td>${carro.modelo}</td>
                    <td>${carro.placa}</td>
                    <td>${carro.disponivel ? "Sim" : "Não"}</td>
                </tr>
            `).join("");
        })
        .catch(error => console.error("Erro ao carregar carros:", error));
});