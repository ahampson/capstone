var heroName = localStorage.getItem("name");
var ability = localStorage.getItem("ability");
var personality = localStorage.getItem("personality");

function updateStats() {
    document.getElementById("magic-gamecount").innerText = gameCount;
    document.getElementById("magic-min").innerText = magicMin !== null ? magicMin : "-";
    document.getElementById("magic-max").innerText = magicMax !== null ? magicMax : "-";
}

function applyAbilityHint() {
    var inputNumber = document.getElementById("input-number");
    var currentValue = parseInt(inputNumber.value) || 50;

    if (ability === "Fire") {
        // Fire: reveal if within 10
        if (Math.abs(currentValue - magicNumber) <= 10) {
            alert("Your fire sense tingles! You're getting warm... very close!");
        } else {
            alert("Your flames feel cold. You're far from the magic number.");
        }
    } else if (ability === "Water") {
        // Water: reveal if higher or lower
        if (currentValue < magicNumber) {
            alert("The current flows upward... go higher!");
        } else if (currentValue > magicNumber) {
            alert("The tide pulls back... go lower!");
        } else {
            alert("The water is perfectly still. You found it!");
        }
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
}

function checkGuess() {
    var inputNumber = document.getElementById("input-number");
    var guess = parseInt(inputNumber.value);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        alert("Please enter a valid number between 1 and 100.");
        return;
    }

    attempts++;

    if (guess === magicNumber) {
        alert("Congratulations, " + heroName + "! You found the magic number " + magicNumber + " in " + attempts + " attempts!");

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

        // Reset game
        magicNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        inputNumber.value = "";
    } else if (guess < magicNumber) {
        alert("Too low! Try a higher number.");
    } else {
        alert("Too high! Try a lower number.");
    }
}

if(!(heroName )){
    alert("Hero Profile is missing");
    window.location = "index.html"
}else{
    var magicNumber = Math.floor(Math.random() * 100) + 1;
    var attempts = 0;
    var gameCount = parseInt(localStorage.getItem("magic-gamecount")) || 0;
    var magicMin = parseInt(localStorage.getItem("magic-min")) || null;
    var magicMax = parseInt(localStorage.getItem("magic-max")) || null;

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
}