function calculateScore(playerId) {
    let totalScore = 0;
    let playerSection = document.getElementById(playerId);
  
    playerSection
      .querySelectorAll(
        ".expedition-red, .expedition-blue, .expedition-green, .expedition-white, .expedition-purple, .expedition-gold"
      )
      .forEach((expedition) => {
        let wagersCount = expedition.querySelectorAll(".wager:checked").length;
        let cardsTotal = Array.from(
          expedition.querySelectorAll(".card:checked")
        ).reduce((total, card) => total + parseInt(card.value), 0);
  
        let expeditionScore = 0;
  
        // If there are cards or wagers, calculate score, otherwise score is 0
        if (expedition.querySelectorAll(".card:checked, .wager:checked").length > 0) {
          expeditionScore = (cardsTotal - 20) * (wagersCount + 1); // Subtract expedition cost and apply wager multiplier
  
          // Add bonus for 8+ cards (including wagers)
          if (expedition.querySelectorAll(".card:checked, .wager:checked").length >= 8) {
            expeditionScore += 20; // 8+ card bonus, not multiplied by wager cards
          }
        }
  
        totalScore += expeditionScore;
      });
  
    playerSection.querySelector(".total-score").textContent =
      "Total Score: " + totalScore;
  }
  
  

  function toggleExpeditionOrder() {
    document.querySelectorAll('.expeditions, .board').forEach(container => {
        container.classList.toggle('reversed-order');
    });
}



function resetCheckboxes(playerId) {
    var playerSection = document.getElementById(playerId);
    var checkboxes = playerSection.querySelectorAll('input[type="checkbox"]');
    
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
    });
}
