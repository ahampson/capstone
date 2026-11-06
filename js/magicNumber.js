var heroName = localStorage.getItem("name");
var ability = localStorage.getItem("ability");
var personality = localStorage.getItem("personality");
var gameCount = localStorage.getItem("magic-gamecount");
var ability_count = 5;
var attempts = 1;
var gameCount = parseInt(localStorage.getItem("magic-gamecount")) || 0;
var magicMin = parseInt(localStorage.getItem("magic-min")) || null;
var magicMax = parseInt(localStorage.getItem("magic-max")) || null;

// Get the modal
var modal = document.getElementById("outputModal");

function isPrime(num) {
  // Numbers less than or equal to 1 are not prime
  if (num <= 1) return false;
  
  // 2 is the only even prime number
  if (num === 2) return true;
  
  // Exclude all other even numbers
  if (num % 2 === 0) return false;

  // Check odd factors up to the square root of the number
  const limit = Math.sqrt(num);
  for (let i = 3; i <= limit; i += 2) {
    if (num % i === 0) return false;
  }

  return true;
}

function updateStats() {
    document.getElementById("game-counter").innerText = gameCount + 1;
    document.getElementById("magic-gamecount").innerText = gameCount;
    document.getElementById("magic-min").innerText = magicMin !== null ? magicMin : "-";
    document.getElementById("magic-max").innerText = magicMax !== null ? magicMax : "-";
}

function updateOutput(msg){
    //document.getElementById("magic-output").innerText = msg;
    // Get the modal
    var modal = document.getElementById("outputModal");
    document.getElementById("magic-output").innerText = msg;
    modal.style.display = "block";
    console.log('[?]');
}

function applyAbilityHint() {
    var inputNumber = document.getElementById("input-number");
    var currentValue = parseInt(inputNumber.value) || 50;

    if(ability_count < 1){
        alert("Your tried to activate your ability but nothing happens...");
        document.getElementById('button-ability').disabled = true;
    }else if (ability === "Fire") {
        // Fire: reveal if within 10
        if (Math.abs(currentValue - magicNumber) <= 10) {
            alert("Your fire sense tingles! You're getting warm... very close!");
        } else {
            alert("Your flames feel cold. You're far from the magic number.");
        }
    } else if (ability === "Water") {
        // Water: reveal if higher or lower
        if (magicNumber % 2 === 0) {
            msg = "The current flows evenly ";
        } else {
            msg = "The current has an odd flow to it ";
        }
        if(magicNumber % 3 === 0){
            msg += "and can be divided into three rivers." 
        }else if(isPrime(magicNumber)){
            msg += "and is in its prime!" 
        }
        alert(msg)
    } else if (ability === "Lightning") {
        // Lightning: reveal a random number close to the magic number
        var hint = magicNumber + Math.floor(Math.random() * 11) - 5;
        hint = Math.max(1, Math.min(100, hint));
        alert("A lightning flash reveals a glimpse: the number is near " + hint + "!");
    } else if (ability === "Nature") {
        // Nature: reveal which quarter the number is in
        if (magicNumber <= 25) {
            alert("The roots grow shallow... the number is between 1 and 25.");
        } else if (magicNumber <= 50) {
            alert("The saplings reach mid-height... the number is between 26 and 50.");
        } else if (magicNumber <= 75) {
            alert("The trees grow tall... the number is between 51 and 75.");
        } else {
            alert("The canopy touches the sky... the number is between 76 and 100.");
        }
    }
    ability_count -= 1
}

function checkGuess() {
    var inputNumber = document.getElementById("input-number");
    var guess = parseInt(inputNumber.value);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        updateOutput("Please enter a valid number between 1 and 100.");
        return;
    }

    attempts++;
    document.getElementById('guess-counter').innerText = attempts;

    if (guess === magicNumber) {
        var modal = document.getElementById("newgameModal");
        modal.style.display = "block";

        gameCount++;
        localStorage.setItem("magic-gamecount", gameCount);

        if (magicMin === null || attempts < magicMin) {
            magicMin = attempts;
            localStorage.setItem("magic-min", magicMin);
        }

        if (magicMax === null || attempts > magicMax) {
            magicMax = attempts;
            localStorage.setItem("magic-max", magicMax);
        }

        updateStats();

    } else if (guess < magicNumber) {
        document.getElementById('guess-min').innerText = guess;
        updateOutput("Too low! Try a higher number.");
    } else {
        document.getElementById('guess-max').innerText = guess;
        updateOutput("Too high! Try a lower number.");
    }
}

if(!(heroName )){
    alert("Hero Profile is missing");
    window.location = "index.html"
}else{
    var magicNumber = Math.floor(Math.random() * 100) + 1;
    var attempts = 0;

    document.getElementById('magic-gamecount').innerText = gameCount || 0;
    document.getElementById('magic-min').innerText = magicMin;
    document.getElementById('magic-max').innerText = magicMax;

    document.getElementById("button-up").addEventListener("click", function () {
        var inputNumber = document.getElementById("input-number");
        var currentValue = parseInt(inputNumber.value) || 0;
        if (currentValue < 100) {
            inputNumber.value = currentValue + 1;
        }else if(currentValue = 100) {
            inputNumber.value = 1;
        }
    });

    document.getElementById("button-down").addEventListener("click", function () {
        var inputNumber = document.getElementById("input-number");
        var currentValue = parseInt(inputNumber.value) || 101;
        if (currentValue > 1) {
            inputNumber.value = currentValue - 1;
        }else if(currentValue = 1) {
            inputNumber.value = 100;
        }
    });

    document.getElementById("button-ability").addEventListener("click", function () {
        applyAbilityHint();
    });

    document.getElementById("button-submit").addEventListener("click", function () {
        checkGuess();
    });
    document.getElementById("button-submit").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            checkGuess();
        }
    });

    document.getElementById("newgame-yes").addEventListener("click", function () {
        // Reset game
        magicNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        inputNumber.value = "";
        document.getElementById("newgameModal").style.display = 'none'
    });

    document.getElementById("newgame-no").addEventListener("click", function () {
        window.location.href = 'profile.html'
    });

    // When the user clicks on <span> (x), close the modal
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    window.onkeydown = function(event) {
        modal.style.display = "none";
        if (event.key === "Enter") {
            checkGuess();
        }
    }
}