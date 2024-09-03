function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function sortTeams() {
    const teamSize = parseInt(document.getElementById('teamSize').value);
    let players = document.getElementById('players').value.split('\n').map(p => p.trim()).filter(p => p);

    if (players == '') {
        alert('Por favor, insira pelo menos um jogador.');
        return;
    }
    
    let teams = [];
    let dreamTeam = ['edson', 'cabecinha', 'biel', 'jefte'];
    let nightmareTeam = ['ppranch', 'sibito', 'pezao', 'julio'];

    players = players.filter(player => !dreamTeam.includes(player) && !nightmareTeam.includes(player));
    
    players = shuffleArray(players);
    dreamTeam = shuffleArray(dreamTeam);
    nightmareTeam = shuffleArray(nightmareTeam);

    let numTeams = Math.ceil((players.length + dreamTeam.length + nightmareTeam.length) / teamSize);
    
    for (let i = 0; i < numTeams; i++) {
        teams.push([]);
    }

    if (teams.length > 0) teams[0].push(...dreamTeam);
    if (teams.length > 1) teams[1].push(...nightmareTeam);

    players.forEach(player => {
        for (let i = 0; i < teams.length; i++) {
            if (teams[i].length < teamSize) {
                teams[i].push(player);
                return;
            }
        }

        teams.push([player]);
    });

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    teams.forEach((team, index) => {
        const teamDiv = document.createElement('div');
        teamDiv.classList.add('team');
        teamDiv.innerHTML = `<strong>Equipe ${index + 1}:</strong><br>${team.join('<br>')}`;
        resultDiv.appendChild(teamDiv);
    });
}
