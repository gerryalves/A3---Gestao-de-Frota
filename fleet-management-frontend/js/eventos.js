document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/api/eventos/listar")
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector("#eventosTable tbody");
            tbody.innerHTML = data.map(evento => `
                <tr>
                    <td>${evento.id}</td>
                    <td>${evento.gestorId}</td>
                    <td>${evento.motoristaId}</td>
                    <td>${evento.carroId}</td>
                    <td>${evento.tipoEvento}</td>
                    <td>${evento.data}</td>
                </tr>
            `).join("");
        })
        .catch(error => console.error("Erro ao carregar eventos:", error));
});