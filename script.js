// Event listener for keyboard inputs
// This listens for any keypresses and triggers the corresponding function
document.addEventListener("keydown", function (event) {
  if (event.key === "r" || event.key === "R") {
    resetCards(); // Call resetCards if 'R' is pressed
  } else if (event.key === "Enter") {
    calculateScores(); // Call calculateScores if 'Enter' is pressed
  } else if (event.key === "s" || event.key === "S") {
    swapOrder(); // Call swapOrder if 'S' is pressed
  }
});

// Function to reset cards
// This function removes the 'active' class from all cards, effectively 'resetting' them
function resetCards() {
  document.querySelectorAll(".card.active").forEach((card) => {
    card.classList.remove("active");
  });

  const scoreDisplay = document.getElementById("score-display");
  if (scoreDisplay) {
    scoreDisplay.innerHTML = ''; // Clear the inner HTML of the score display
    scoreDisplay.style.display = 'none'; // Hide the score display
  }
}

// Find the button by its ID
var resetCardsButton = document.getElementById('resetCards');

// Add a click event listener to the button
resetCardsButton.addEventListener('click', function() {
    resetCards(); // Call the resetCards function when the button is clicked
});


// Event listeners for card interactions and buttons
// This section manages the behavior when interacting with the cards and buttons on the page

// Add click event listener to each card element
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", function () {
    this.classList.toggle("active"); // Toggle 'active' class on click

    // Rotate the card based on whether it's active or not
    if (this.classList.contains("active")) {
      this.style.setProperty("--rotate-y", "180deg"); // Rotate card to 180 degrees if active
    } else {
      this.style.setProperty("--rotate-y", "0deg"); // Rotate card back to 0 degrees if not active
    }
  });
});

function swapOrder() {
  const expeditions = document.querySelectorAll('div[class^="expedition-"]');
  isSwapped = !isSwapped; // Toggle the state of isSwapped

  expeditions.forEach((expedition) => {
    const baseOrder = {
      "expedition-purple": 1,
      "expedition-red": 2,
      "expedition-green": 3,
      "expedition-blue": 4,
      "expedition-grey": 5,
      "expedition-gold": 6,
    };

    const swappedOrder = 7 - baseOrder[expedition.className]; // Calculate new order for swapping
    expedition.style.order = isSwapped
      ? swappedOrder.toString()
      : baseOrder[expedition.className].toString(); // Apply new order
  });

  // Call calculateScores to update the scores based on new order
  calculateScores();
}

// Flag variable to track the swap state of expeditions
let isSwapped = false;

// Add click event listener to the 'Calculate Scores' button
document.getElementById("swapOrder").addEventListener("click", swapOrder);
document
  .getElementById("calculate-button")
  .addEventListener("click", calculateScores);

// Function to calculate and display scores
// This function calculates the scores based on the active cards in each expedition

function calculateScores() {
  // Select all expedition divs and sort them based on their CSS order
  const expeditions = Array.from(
    document.querySelectorAll('div[class^="expedition-"]')
  );
  expeditions.sort(
    (a, b) =>
      parseInt(getComputedStyle(a).order) - parseInt(getComputedStyle(b).order)
  );

  // Extract color names from the sorted expedition divs
  const orderedColors = expeditions.map(
    (expedition) => expedition.className.split("-")[1]
  );

  let totalScore = 0;
  let colorColumnsHtml = ""; // HTML for the columns of each color's score

  orderedColors.forEach((color) => {
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
    }

    let colorTotalScore = expeditionScore + bonusPoints;
    totalScore += colorTotalScore;

    // Construct HTML for each color's column
    colorColumnsHtml += `<div class='color-score-column ${color}-column'>`;
    colorColumnsHtml += `<div class='color-score-total'>${color}:<br>${expeditionScore}</div>`;
    if (bonusPoints > 0) {
      colorColumnsHtml += `<div class='color-score-bonus'>Bonus for ${color}: ${bonusPoints}</div>`;
    }
    colorColumnsHtml += `</div>`;
  });

  // Construct the final display text with scores and total score
  let scoreDisplayText = `<div class='scores-heading'>Scores</div>`;
  scoreDisplayText += `<div class='scores-columns'>${colorColumnsHtml}</div>`;
  scoreDisplayText += `<div class='overall-total-score'><strong>Total Score: ${totalScore}</strong></div>`;

  document.getElementById("score-display").innerHTML = scoreDisplayText;

  const scoreDisplay = document.getElementById("score-display");
  if (scoreDisplay) {
    scoreDisplay.style.display = 'block'; // Show the score display
    // Update the inner HTML of scoreDisplay with the new scores
    scoreDisplay.innerHTML = scoreDisplayText;
  }
}

