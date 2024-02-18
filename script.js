function calculateScore() {
    let totalScore = 0;
    
    document.querySelectorAll('.expedition').forEach(expedition => {
        let wagers = Array.from(expedition.querySelectorAll('.wager:checked')).reduce((count, wager) => count + parseInt(wager.value), 0);
        let cardsSelected = expedition.querySelectorAll('.card:checked').length;
        let cardsTotal = Array.from(expedition.querySelectorAll('.card:checked')).reduce((total, card) => total + parseInt(card.value), 0);
        
        let score = (cardsTotal - 20) * (wagers + 1);
        if (cardsSelected >= 8) {
            score += 20; // 8+ card bonus
        }
        totalScore += score;
    });

    document.getElementById('total-score').textContent = 'Total Score: ' + totalScore;
}
