// This section adds a click event listener to every element with the class 'card'.
// When a card is clicked, it toggles the 'active' class and adjusts the rotation.
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", function () {
    // Toggle the 'active' class on the clicked card
    this.classList.toggle("active");

    // If the card is active, set its rotation to 180 degrees; otherwise, set it to 0 degrees
    if (this.classList.contains("active")) {
      this.style.setProperty("--rotate-y", "180deg");
    } else {
      this.style.setProperty("--rotate-y", "0deg");
    }
  });
});

// This section adds a click event listener to the button with the ID 'resetCards'.
// When clicked, it removes the 'active' class from all cards that currently have it.
document.getElementById("resetCards").addEventListener("click", function () {
  // Select all cards that are active and remove the 'active' class
  document.querySelectorAll(".card.active").forEach((card) => {
    card.classList.remove("active");
  });
});

// A flag variable to keep track of whether the expeditions are swapped or not.
let isSwapped = false;

// This section adds a click event listener to the button with the ID 'swapOrder'.
// When clicked, it changes the order of the expedition columns.
document.getElementById("swapOrder").addEventListener("click", function () {
  // Select all elements that start with the class name 'expedition-'
  const expeditions = document.querySelectorAll('div[class^="expedition-"]');

  // Iterate over each expedition element
  expeditions.forEach((expedition) => {
    // Check if expeditions are not swapped
    if (!isSwapped) {
      // Switch to swapped order based on the class name of the expedition
      switch (expedition.className) {
        case "expedition-purple":
          expedition.style.order = "6";
          break;
        case "expedition-red":
          expedition.style.order = "5";
          break;
        case "expedition-green":
          expedition.style.order = "4";
          break;
        case "expedition-blue":
          expedition.style.order = "3";
          break;
        case "expedition-grey":
          expedition.style.order = "2";
          break;
        case "expedition-gold":
          expedition.style.order = "1";
          break;
      }
    } else {
      // Switch back to original order based on the class name of the expedition
      switch (expedition.className) {
        case "expedition-purple":
          expedition.style.order = "1";
          break;
        case "expedition-red":
          expedition.style.order = "2";
          break;
        case "expedition-green":
          expedition.style.order = "3";
          break;
        case "expedition-blue":
          expedition.style.order = "4";
          break;
        case "expedition-grey":
          expedition.style.order = "5";
          break;
        case "expedition-gold":
          expedition.style.order = "6";
          break;
      }
    }
  });

  // Toggle the isSwapped flag to indicate the current state of the order
  isSwapped = !isSwapped;
});

document
  .getElementById("calculate-button")
  .addEventListener("click", calculateScores);

document
  .getElementById("calculate-button")
  .addEventListener("click", calculateScores);

function calculateScores() {
  const colors = ["red", "blue", "green", "grey", "purple", "gold"];
  let totalScore = 0;
  let scoreDisplayText = "";

  colors.forEach((color) => {
    const expeditionCards = document.querySelectorAll(
      `.expedition-${color} .card.expedition-card.active`
    );
    const wagerCards = document.querySelectorAll(
      `.expedition-${color} .card.wager.active`
    );

    let expeditionScore = 0;
    let bonusPoints = 0;

    // Calculate score for expedition cards
    expeditionCards.forEach((card) => {
      expeditionScore += parseInt(card.getAttribute("value"));
    });

    // Apply expedition cost if there are any cards (wager or expedition)
    if (expeditionCards.length > 0 || wagerCards.length > 0) {
      expeditionScore -= 20;
    }

    // Apply wager multiplier
    if (wagerCards.length > 0) {
      expeditionScore *= wagerCards.length + 1;
    }

    // Check for bonus points
    if (expeditionCards.length + wagerCards.length >= 8) {
      bonusPoints = 20;
      expeditionScore += bonusPoints;
    }

    scoreDisplayText += `Score for ${color}: ${expeditionScore}<br>`;
    if (bonusPoints > 0) {
      scoreDisplayText += `${
        color.charAt(0).toUpperCase() + color.slice(1)
      } Bonus Points: ${bonusPoints}<br>`;
    }
    totalScore += expeditionScore;
  });

  scoreDisplayText += `<strong>Total Score: ${totalScore}</strong>`;
  document.getElementById("score-display").innerHTML = scoreDisplayText;
}
