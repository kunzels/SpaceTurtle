document.addEventListener("DOMContentLoaded", () => {

    // add event listener to end turn (research how to just add it to the html?)
    document.getElementById('end-turn').addEventListener('click',
    function(){
        endTurn();
    })

    // Player

    const player = { name: "SpaceTurtle", strength:0, defense: 0, hitPoints: 50, energy: 3 }
  

    // Monster

    const enemy = {name: "Slimey", hitPoints: 20, defense: 0, strength: 0}
    const enemyMoves = [
        {name: 'Attack', attack: 5},
        {name: 'Defend', defense: 5}
    ]

    // All Cards

    const allCards = [
        { name: "Punch", attack: 6, defense: 0, cost: 1, description: 'Deal 6 damage' },
        { name: "Defend", attack: 0, defense: 5, cost: 1, description: 'Gain 5 defense' },
        { name: "Shell Slam", attack: 10, defense: 6, cost: 2, description: 'Deal 10 damage. Gain 6 defense' }
    ]

    // Deck

    let deck = [
        { name: "Punch", attack: 6, defense: 0, cost: 1, description: 'Deal 6 damage' },
        { name: "Punch", attack: 6, defense: 0, cost: 1, description: 'Deal 6 damage' },
        { name: "Punch", attack: 6, defense: 0, cost: 1, description: 'Deal 6 damage' },
        { name: "Punch", attack: 6, defense: 0, cost: 1, description: 'Deal 6 damage' },
        { name: "Punch", attack: 6, defense: 0, cost: 1, description: 'Deal 6 damage' },
        { name: "Defend", attack: 0, defense: 5, cost: 1, description: 'Gain 5 defense' },
        { name: "Defend", attack: 0, defense: 5, cost: 1, description: 'Gain 5 defense' },
        { name: "Defend", attack: 0, defense: 5, cost: 1, description: 'Gain 5 defense' },
        { name: "Defend", attack: 0, defense: 5, cost: 1, description: 'Gain 5 defense' },
        { name: "Defend", attack: 0, defense: 5, cost: 1, description: 'Gain 5 defense' },
        { name: "Shell Slam", attack: 10, defense: 6, cost: 2, description: 'Deal 10 damage. Gain 6 defense' }
    ];

    // Discard

    let discard = []

    // Hand
    let hand = []
    let handSize = 0;
    let maxHandSize = 10;
    let drawAmount = 5;

    // Gameplay Functions

    function drawHand() {
        let cardList = document.querySelector('.card-list');
        // Draw Cards
        for (let draw = 0; draw < drawAmount && handSize !== maxHandSize; draw++) {
     
            if (deck.length === 0) {
                deck = discard.slice();
                shuffle(deck);
                discard = [];
                debugger;
            }
            debugger;
            handSize += 1;
            let random = Math.floor(Math.random() * deck.length);
            let card = deck[random];
            deck.splice(random, 1);
            hand.push(card);
            let cardLi = document.createElement("li");
            cardLi.innerHTML = `${card.name}    ${card.description}`;
            cardLi.className = 'Card';
            cardList.appendChild(cardLi)
            // playing a card
            cardLi.addEventListener('click',
                    function () {
                        //bug - cant move hand objects to discard on click
                        if (player.energy >= card.cost){
                            console.log("You clicked on a card")
                                player.energy -= card.cost;
                                enemy.hitPoints -= (card.attack + player.strength);
                                player.defense += card.defense;
                                updatePlayer();
                                updateEnemy();
                                checkEnemyDeath();
                                index = hand.indexOf(card);
                                discard.push(card);
                                hand.splice(index, 1);
                                this.remove(this);
                                handSize -= 1;
                        } else {
                            console.log("You have not enough energy");
                        }
                    })
        }
    }

    function checkEnemyDeath(){
        if(enemy.hitPoints <= 0){
            alert('you win')
        }
    }

    function updatePlayer() {
        let stats = document.querySelector(".stats");
        stats.innerHTML = `Hit Points:${player.hitPoints}    Energy: ${player.energy}`;
        if(player.defense > 0){
            stats.innerHTML = `Hit Points:${player.hitPoints}    Energy: ${player.energy} Defense: ${player.defense}`
        }
    }

    function updateEnemy() {
        let enemyStats = document.querySelector(".enemy-stats");
        enemyStats.innerHTML = `Hit Points:${enemy.hitPoints}`;
        if (enemy.defense > 0) {
            stats.innerHTML = `Hit Points:${enemy.hitPoints} Defense: ${enemy.defense}`
        }
    }
    
    function endTurn(){
        cards = document.querySelectorAll('li');
        cards.forEach(function(card){
            card.remove();
        })
        hand.forEach(function(card){
            discard.push(card);
            handSize -= 1;
        })
        hand = [];
        drawHand();
        player.energy = 3;
    }

    function intention() {
        let random = Math.floor(Math.random() * enemyMoves.length)
        let intent = document.querySelector('.intent');
        intentMove = enemyMoves[random];
        intent.innerHTML = `Attack:${intentMove.attack}    Defense: ${intentMove.defense}`;

    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }


     // Turn
    updatePlayer();
    updateEnemy();
    drawHand();
    intention();
    
})
