window.onload = function() {
    localStorage.clear();
    document.getElementById("name").value = "";
}

function getRandom(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1)) + minCeiled; 
}

document.getElementById("btn-create").addEventListener("click",function(e){
    e.preventDefault();
    const name = document.getElementById("name").value;

    if((name == "") || (!(document.querySelector("input[name='ability']:checked")))){
        if(name == ""){
            alert("Please enter a name");
        }else{
            alert("Please select an ability");
        }
        return;
    }else{
        localStorage.setItem("name", name);
        localStorage.setItem("ability", document.querySelector("input[name='ability']:checked").value);
        localStorage.setItem("magic-gamecount",0);
        localStorage.setItem("magic-min",0);
        localStorage.setItem("magic-max",0);

        Math.round(Math.random()*10)
        personality = ["Agressive", "Supportive", "Timid", "Reluctant", "Passive","Agressive", "Supportive", "Timid", "Reluctant", "Passive"]
        localStorage.setItem("personality", personality[getRandom(0,9)]);
        window.location = 'profile.html'
    }
});

function setActive(ability){
    document.getElementById("ability-fire").classList.remove('active');
    document.getElementById("ability-water").classList.remove('active');
    document.getElementById("ability-lightning").classList.remove('active');
    document.getElementById("ability-nature").classList.remove('active');
    document.getElementById("ability-"+ability).classList.add('active');
}

var abilities = ["Fire", "Water", "Lightning", "Nature"];

abilities.forEach(function(ability){
    document.getElementById("ability-"+ability.toLowerCase()).addEventListener("click", function(e){
        document.getElementById(ability.toLowerCase()).checked = true;
        setActive(ability.toLowerCase());
    });
    document.getElementById("ability-"+ability.toLowerCase()).addEventListener("change", function(e){
        document.getElementById(ability.toLowerCase()).checked = true;
        setActive(ability.toLowerCase());
    });
});



// localStorage.setItem("myCat", "Tom");
// const cat = localStorage.getItem("myCat");
// localStorage.removeItem("myCat");