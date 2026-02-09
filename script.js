window.onload = function () {
  var loadingDiv = document.getElementById("loadingDiv");
  loadingDiv.classList.add("is-hidden");
};

// Event listener for keyboard inputs
document.addEventListener("keydown", function (event) {
  if (event.key === "r" || event.key === "R") {
    resetCards(); // Call resetCards if 'R' is pressed
  } else if (event.key === "Enter") {
    calculateScores(); // Call calculateScores if 'Enter' is pressed
    showModal(); // Show the modal when Calculate Scores is executed
  }
});

// Function to reset cards
function resetCards() {
  document.querySelectorAll(".card.active").forEach((card) => {
    card.classList.remove("active");
  });
  updateResetButtonVisibility(); // Update the visibility of the reset button after resetting cards
}

// Find the button by its ID
var resetCardsButton = document.getElementById("resetCards");

// Add a click event listener to the button
resetCardsButton.addEventListener("click", function () {
  resetCards(); // Call the resetCards function when the button is clicked
  updateResetButtonVisibility(); // Update the visibility of the reset button
});

// Event listeners for card interactions
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", function () {
    this.classList.toggle("active"); // Toggle 'active' class on click

    // Rotate the card based on whether it's active or not
    if (this.classList.contains("active")) {
      this.style.setProperty("--rotate-y", "180deg"); // Rotate card to 180 degrees if active
    } else {
      this.style.setProperty("--rotate-y", "0deg"); // Rotate card back to 0 degrees if not active
    }

    updateResetButtonVisibility(); // Call this function to update the visibility of the reset button
  });
});

resetCardsButton.style.display = "none"; // Initially hide the reset button

function updateResetButtonVisibility() {
  const anyActiveCard = document.querySelector(".card.active");
  resetCardsButton.style.display = anyActiveCard ? "block" : "none";
}
let isSwapped = false;

// Function to swap order
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
}

// Add click event listener to the 'Swap Order' button
document.getElementById("swapOrder").addEventListener("click", swapOrder);

// Function to calculate and display scores
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
    colorColumnsHtml += `<div class='exp-icon'><img src='Images/${color}-expedition.png' /></div>`;
    colorColumnsHtml += `<div class='color-score-total'>${expeditionScore}</div>`;
    if (bonusPoints > 0) {
      colorColumnsHtml += `<div class='color-score-bonus-title'>Bonus</div>`;
      colorColumnsHtml += `<div class='color-score-bonus-total'>${bonusPoints}</div>`;
    }
    colorColumnsHtml += `</div>`;
  });

  // Constructing the scoreDisplayText with new HTML structure
  let scoreDisplayText = `<div class='overall-total-score'>`;
  scoreDisplayText += `<strong>Total Score</strong>`;
  scoreDisplayText += `<div class='final-score'>${totalScore}</div>`;
  scoreDisplayText += `</div>`;
  scoreDisplayText += `<div class='scores-columns'>${colorColumnsHtml}</div>`;

  // Update score-display content
  document.getElementById("score-display").innerHTML = scoreDisplayText;
}

// Add click event listener to the 'Calculate Scores' button
document
  .getElementById("calculate-button")
  .addEventListener("click", function () {
    calculateScores();
    showModal(); // Show the modal when Calculate Scores is clicked
  });

// Functions to show and hide modal
function showModal() {
  var modal = document.getElementById("scoreModal");
  modal.style.display = "block";
}

function hideModal() {
  var modal = document.getElementById("scoreModal");
  modal.style.display = "none";
}

// Get the modal
var modal = document.getElementById("scoreModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  hideModal();
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  var scoreModal = document.getElementById("scoreModal");

  // Check for scoreModal
  var scoreModalContent = scoreModal.querySelector(".modal-content");
  if (event.target == scoreModal && !scoreModalContent.contains(event.target)) {
    hideModal("scoreModal");
  }
};

// Add click event listener to the Reset Cards button
var resetCardsButton = document.getElementById("resetCards");
resetCardsButton.addEventListener("click", function () {
  resetCards();
});

resetCardsButton.style.display = "none"; // Initially hide the reset button

function updateResetButtonVisibility() {
  const anyActiveCard = document.querySelector(".card.active");
  resetCardsButton.style.display = anyActiveCard ? "block" : "none";
}

resetCardsButton.addEventListener("click", function () {
  resetCards();
  updateResetButtonVisibility(); // Hide the button after resetting cards
});
