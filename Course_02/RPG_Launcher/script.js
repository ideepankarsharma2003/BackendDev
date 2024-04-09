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
    
}

function dodge(){

}
