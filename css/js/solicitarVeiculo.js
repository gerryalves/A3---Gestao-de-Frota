document.getElementById('solicitarForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const gestorId = document.getElementById('gestorId').value;
    const motoristaId = document.getElementById('motoristaId').value;
    const telefoneMotorista = document.getElementById('telefoneMotorista').value;
    const carroId = document.getElementById('carroId').value;
    const odometroAtual = document.getElementById('odometroAtual').value;

    const data = {
        gestorId,
        motoristaId,
        telefoneMotorista,
        carroId,
        odometroAtual
    };

    fetch('http://localhost:3000/api/eventos/solicitar', {
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
