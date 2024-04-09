let xp= 0
let health= 100
let gold= 50
let currentWeapon= 0
let fighting
let monsterHealth
let inventory= [
    `stick`, 
    // "dagger", 
    // "sword"
    ]

const button1= document.querySelector("#button1")
const button2= document.querySelector("#button2")
const button3= document.querySelector("#button3")
const text= document.querySelector("#text")
const xpText= document.querySelector("#xpText")
const healthText= document.querySelector("#healthText")
const goldText= document.querySelector("#goldText")
const monsterStats= document.querySelector("#monsterStats")
const monsterNameText= document.querySelector("#monsterName")
const monsterHealthText= document.querySelector("#monsterHealth")

const weapons= [
    {name:"stick", power: 5},
    {name:"dagger", power: 30},
    {name:"claw hammer", power: 50},
    {name:"sword", power: 100},
]

const monsters= [
    {name: "slime", level:2, health: 15},
    {name: "fanged beast", level:8, health: 60},
    {name: "dragon", level:20, health: 300},
]

const locations= [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight the dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: 'You are in the town square. You see a sign that says "store".'
    },
    
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapons (30 gold)", "Go to Town Square"],
        "button functions": [buyHealth, buyWeapon, goTownSquare],
        text: "You have entered the store."
    },
    
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to Town Square"],
        "button functions": [fightSlime, fightBeast, goTownSquare],
        text: "You have entered the cave. You see some monsters."
    },
    
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Go to Town Square"],
        "button functions": [attack, dodge, goTownSquare],
        text: "You have entered the cave. You see some monsters."
    },
    
    {
        name: "kill monster",
        "button text": ["Go to Town Square", "Go to Town Square", "Go to Ester Egg"],
        "button functions": [goTownSquare, goTownSquare, easterEgg],
        text: "The monster screams `Arg!` as it dies. You gain experience points and find gold."
    },
    
    {
        name: "loose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You die. ☠️💀"
    },
    
    {
        name: "winGame",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You defeat the dragon! YOU WIN THE GAME ! 😎"
    },
    
    {
        name: "easter egg",
        "button text": ["2", "8", "Go to Town Square"],
        "button functions": [pickTwo, pickEight, goTownSquare],
        text: "You find a secret weapon. Pick a number above. Ten numbers will be randomly choosen between 1 and 10. If the number you choose matches the number randomly choosen , You win 20 gold !😚  Else you loose 10 health 🫡"
    },

]


/**
 * initializing buttons
 */
button1.onclick= goStore
button2.onclick= goCave
button3.onclick= fightDragon



/**
 * defining function
 */
function update(location){
    monsterStats.style.display= "none"
    button1.innerText= location["button text"][0]
    button2.innerText= location["button text"][1]
    button3.innerText= location["button text"][2]
    button1.onclick= location["button functions"][0]
    button2.onclick= location["button functions"][1]
    button3.onclick= location["button functions"][2]
    text.innerText= location.text

}

function goTownSquare(){
    console.log("Going to Town Square.")    
    update(locations[0])
}

function goStore(){
    console.log("Going to store.")
    update(locations[1])
}

function goCave(){
    console.log("Going to cave.")
    update(locations[2])
}

function buyHealth(){
    if(gold>=10){
        console.log("Buy the Health.")
        gold= gold-10
        health+=10
        goldText.innerText= gold
        healthText.innerText= health
    }else{
        alert("Not enough the gold to buy health !")
    }
    
}

function buyWeapon(){
    if (currentWeapon< weapons.length-1) {
        if (gold>=30) {
            console.log("Buy the Weapon.")
            gold-=30
            goldText.innerText= gold
            currentWeapon++
            let newWeapon= weapons[currentWeapon].name
            text.innerText= "You now have a new weapon "+ newWeapon+ "."
            inventory.push(newWeapon)
            text.innerText+= "In your inventory you have: "+ inventory
        }else{
            alert("Not enough the gold to buy weapons !")
        }
    }else{
        alert("You already have most powerful weapon")
        button2.innerText= "Sell weapon for 15 gold"
        button2.onclick= sellWeapon
    }
}

function sellWeapon(){
    if (inventory.length>1) {
        console.log("Sell the weapon.")
        gold+=15
        goldText.innerText= gold
        let currentWeapon= inventory.shift()
        text.innerText= "You sold a "+ currentWeapon+ "."+ "In your inventory you have: "+ inventory
        
    } else {
        alert("Don't sell your only weapon -.-")
    }

}


function goFight(){
    update(locations[3])
    monsterHealth= monsters[fighting].health
    monsterStats.style.display= "block"
    monsterNameText.innerText= monsters[fighting].name
    monsterHealthText.innerText= monsterHealth
}

function fightSlime(){
    console.log("Fight the Slime.")
    fighting=0
    goFight()
}

function fightBeast(){
    console.log("Fight the Fanged Beast.")
    fighting=1
    goFight()
}

function fightDragon(){
    console.log("Fight the Dragon.")
    fighting=2
    goFight()
}

function attack(){
    text.innerText= "The "+ monsters[fighting].name+ " attacks.";
    text.innerText+= "You attack with your "+ weapons[currentWeapon].name+ ".";
    if (isMonsterHit()){
        health-=getMonsterAttackValue(monsters[fighting].level)
    }else{
        text.innerText= "You Missed -.-"
    }
    monsterHealth-= weapons[currentWeapon].power + Math.floor(Math.random()*xp)+1
    monsterHealthText.innerText= monsterHealth
    healthText.innerText= health
    if (health<=0){
        health=0
        healthText.innerText= health
        lose();
    }else if (monsterHealth<=0){
        fighting==2? winGame(): defeatMonster()
    }

    if (Math.random()<.1 && inventory.length!==1) {
        text.innerText+= "Your "+ inventory.pop()+ " breaks."
        currentWeapon--
    }
}

function isMonsterHit(){
    return Math.random()>.2 || health<20;
}

function getMonsterAttackValue(level){
    hit= (level*5)- Math.floor(Math.random()-xp)
    console.log("hit: "+ hit)
    return hit
}

function dodge(){
    text.innerText= "You dodge the attack from the "+ monsters[fighting].name+ ".";
}

function lose(){
    // alert(locations[5].text)
    update(locations[5])
}

function winGame(){
    // alert(locations[6].text)
    update(locations[6])
}

function defeatMonster(){
    // alert("You defeated the monster !")
    gold+= Math.floor(monsters[fighting].level*6.7)
    xp+= monsters[fighting].level
    goldText.innerText= gold
    xpText.innerText= xp
    update(locations[4])
}

function restart(){
    // alert("Restart the game !")
    xp= 0
    health= 100
    gold= 50
    currentWeapon= 0
    fighting
    monsterHealth
    inventory= [
        `stick`, 
        // "dagger", 
        // "sword"
        ]
    goldText.innerText= gold
    healthText.innerText= health
    xpText.innerText= xp
    goTownSquare()
}

function easterEgg(){
    update(locations[7])
}

function pickTwo(){
    pick(2)
}

function pickEight(){
    pick(8)
}

function pick(guess){
    let numbers= []
    while (numbers.length<11){
        numbers.push(
            Math.floor(Math.random()*11)
        )
    }

    text.innerText= "You picked "+ guess+ ". Here are the random numbers: \n"
    for (let i = 0; i < 10; i++) {
        text.innerText+= numbers[i]+ "\n"
    }

    if (numbers.indexOf(guess)!=-1){
        text.innerText+= "Right! You win 20 gold !"
        gold+=20
        goldText.textContent= gold
    }else{
        text.innerText+= "Wrong! You lose 10 health !"
        health-=10
        healthText.innerText= health
    }if (health<=0){
        health=0
        healthText.innerText= health
        lose();
    }
}

