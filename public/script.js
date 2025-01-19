let totalFields = 5;
let playerTroops = Array(totalFields).fill(0);

function generateFields() {
    const fields = document.getElementById('fields');
    fields.innerHTML = '';
    for (let i = 0; i < totalFields; i++) {
        fields.innerHTML += `<div class="field">Поле ${i + 1}: <input type="number" id="field${i}" min="0" value="0" onchange="updateTroops(${i}, this.value)"></div>`;
    }
}

function updateTroops(index, value) {
    playerTroops[index] = parseInt(value) || 0;
}

function submitTroops() {
    fetch('/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ troops: playerTroops })
    }).then(response => response.json()).then(data => {
        document.getElementById('result').textContent = data.message;
    });
}

generateFields();
