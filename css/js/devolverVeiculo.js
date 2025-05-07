document.getElementById('devolverForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const gestorId = document.getElementById('gestorIdDev').value;
    const motoristaId = document.getElementById('motoristaIdDev').value;
    const telefoneMotorista = document.getElementById('telefoneMotoristaDev').value;
    const carroId = document.getElementById('carroIdDev').value;
    const odometroAtual = document.getElementById('odometroAtualDev').value;

    const data = {
        gestorId,
        motoristaId,
        telefoneMotorista,
        carroId,
        odometroAtual
    };

    fetch('http://localhost:3000/api/eventos/devolver', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(data => alert(data))
    .catch(error => console.error('Erro:', error));
});
