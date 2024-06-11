let totalContribution = 0;
let retryCount = 0;

function nextScene(sceneId) {
    const scenes = document.querySelectorAll('.scene');
    scenes.forEach(scene => {
        scene.style.display = 'none';
    });
    document.getElementById(sceneId).style.display = 'block';
}

function makeChoice(playerChoice) {
    gtag('event', 'make_choice', {
        'event_category': 'Game',
        'event_label': playerChoice
    });

    const choices = ['high', 'low'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    
    let result = '';
    
    if (playerChoice === 'high' && computerChoice === 'high') {
        result = 'Both set the price high. Firm A: $800 million, Firm B: $800 million.';
        totalContribution = 800;
    } else if (playerChoice === 'high' && computerChoice === 'low') {
        result = 'You set the price high and the competitor set it low. Firm A: $0, Firm B: $1.2 billion.';
        totalContribution = 0;
    } else if (playerChoice === 'low' && computerChoice === 'high') {
        result = 'You set the price low and the competitor set it high. Firm A: $1.2 billion, Firm B: $0.';
        totalContribution = 1200;
    } else {
        result = 'Both set the price low. Firm A: $600 million, Firm B: $600 million.';
        totalContribution = 600;
    }
    
    document.getElementById('result').innerText = `Competitor chose to set the price ${computerChoice}. ${result}`;
    nextScene('scene5');
}

function retry() {
    retryCount++;
    gtag('event', 'retry', {
        'event_category': 'Game',
        'event_label': 'Retry Count',
        'value': retryCount
    });
    nextScene('scene4');
}

function showConclusion() {
    document.getElementById('conclusion').innerText = `Your total contribution/earnings are $${totalContribution} million.`;
    nextScene('scene6');
}

function finishGame() {
    alert("Thank you for playing the Ultra-Phone Game!");
    location.reload();
}

// Initialize the game
nextScene('scene1');
