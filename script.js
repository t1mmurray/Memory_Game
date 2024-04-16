const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.setAttribute("id", "color")

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

allowClicking = true;
card1 = null;
card2 = null;
totalMatched = 0;

// TODO: Implement this function!
function handleCardClick(event) {
  if (allowClicking && card1 === null) {
    firstClickedCard = event.target
    card1 = firstClickedCard.className
    firstClickedCard.style.backgroundColor = card1
    firstClickedCard.removeEventListener("click", handleCardClick)
    return
  } else if (allowClicking && card1 !== null){
    secondClickedCard = event.target
    card2 = secondClickedCard.className
    secondClickedCard.style.backgroundColor = card2
  } else {
    return
  }

  if (card1 === card2) {
    firstClickedCard.removeEventListener("click", handleCardClick)
    secondClickedCard.removeEventListener("click", handleCardClick)
    
    card1 = null
    card2 = null

    totalMatched+=2

    if(totalMatched === COLORS.length){
      setTimeout(()=>{
        alert("Success!")
    }, 1000)
  }

  } else if (card1 !== card2) {
    allowClicking = false;
    setTimeout(()=> {
      firstClickedCard.style.backgroundColor = "";
      secondClickedCard.style.backgroundColor = "";
      firstClickedCard.addEventListener("click", handleCardClick)
      card1 = null
      card2 = null
      allowClicking = true;
    }, 2000)
  }
}

// when the DOM loads
createDivsForColors(shuffledColors)
