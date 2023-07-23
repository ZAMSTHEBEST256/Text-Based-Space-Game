let spaceship = {
    fuel: 100,
    food: 50,
    oxygen: 100,
    health: 100,
    shields: 100,
    energy: 100,
    water: 50,
  };
  
  let previousInput = ''; // Store the previous input text
  let isGameOver = false;
  
  function updateResourceArea() {
    document.getElementById('fuel').textContent = spaceship.fuel;
    document.getElementById('food').textContent = spaceship.food;
    document.getElementById('oxygen').textContent = spaceship.oxygen;
    document.getElementById('health').textContent = spaceship.health;
    document.getElementById('shields').textContent = spaceship.shields;
    document.getElementById('energy').textContent = spaceship.energy;
    document.getElementById('water').textContent = spaceship.water;
  }
  
  function explorePlanet() {
    let randomEvent = Math.random();
    let message = "";
  
    let resourcesLost = Math.floor(Math.random() * 10) + 5;
    spaceship.fuel -= resourcesLost;
    spaceship.food -= resourcesLost;
    spaceship.oxygen -= resourcesLost;
    spaceship.energy -= resourcesLost;
    spaceship.water -= resourcesLost;
  
    if (randomEvent < 0.3) {
      let resourcesFound = Math.floor(Math.random() * 20) + 5;
      spaceship.fuel += resourcesFound;
      spaceship.food += resourcesFound;
      spaceship.oxygen += resourcesFound;
      spaceship.energy += resourcesFound;
      spaceship.water += resourcesFound;
      message = `You discovered valuable resources! (+${resourcesFound} fuel, +${resourcesFound} food, +${resourcesFound} oxygen, +${resourcesFound} energy, and +${resourcesFound} water)`;
    } else if (randomEvent < 0.6) {
      message = `You explored the planet but found nothing of interest. (-${resourcesLost} fuel, -${resourcesLost} food, -${resourcesLost} oxygen, -${resourcesLost} energy, and -${resourcesLost} water)`;
    } else {
      let resourcesLost = Math.floor(Math.random() * 20) + 10;
      spaceship.fuel -= resourcesLost;
      spaceship.food -= resourcesLost;
      spaceship.oxygen -= resourcesLost;
      spaceship.health -= resourcesLost;
      spaceship.shields -= resourcesLost;
      spaceship.energy -= resourcesLost;
      spaceship.water -= resourcesLost;
      message = `Uh-oh, the planet is toxic! You lost some of every resource. (-${resourcesLost} fuel, -${resourcesLost} food, -${resourcesLost} oxygen, -${resourcesLost} health, -${resourcesLost} shields, -${resourcesLost} energy, and -${resourcesLost} water)`;
    }
  
    if (spaceship.fuel <= 0 || spaceship.health <= 0 || spaceship.energy <= 0 ||
        spaceship.oxygen <= 0 || spaceship.water <= 0 || spaceship.food <= 0) {
      endGame();
      return;
    }
  
    updateResourceArea();
    document.getElementById('outputText').textContent = message;
  }
  
  function encounterAlien() {
    let randomEvent = Math.random();
    let message = "";
  
    if (randomEvent < 0.4) {
      let resourcesGained = Math.floor(Math.random() * 20) + 5;
      spaceship.fuel += resourcesGained;
      spaceship.food += resourcesGained;
      spaceship.oxygen += resourcesGained;
      spaceship.energy += resourcesGained;
      spaceship.water += resourcesGained;
      message = `You encountered a friendly alien species! They shared resources with you. (+${resourcesGained} fuel, +${resourcesGained} food, +${resourcesGained} oxygen, +${resourcesGained} energy, and +${resourcesGained} water)`;
    } else {
      let damageTaken = Math.floor(Math.random() * 15) + 10;
      spaceship.fuel -= damageTaken;
      spaceship.food -= damageTaken;
      spaceship.oxygen -= damageTaken;
      spaceship.health -= damageTaken;
      spaceship.shields -= damageTaken;
      spaceship.energy -= damageTaken;
      spaceship.water -= damageTaken;
      message = `Hostile aliens attacked your spaceship! You lost ${damageTaken} fuel, ${damageTaken} food, ${damageTaken} oxygen, ${damageTaken} health, ${damageTaken} shields, ${damageTaken} energy, and ${damageTaken} water.`;
    }
  
    if (spaceship.fuel <= 0 || spaceship.health <= 0 || spaceship.energy <= 0 ||
        spaceship.oxygen <= 0 || spaceship.water <= 0 || spaceship.food <= 0) {
      endGame();
      return;
    }
  
    updateResourceArea();
    document.getElementById('outputText').textContent = message;
  }

function endGame() {
    isGameOver = true;
    document.getElementById('outputText').textContent = 'Game Over. You ran out of essential resources!';
    document.getElementById('input').disabled = true;
  }
  
  function restartGame() {
    isGameOver = false;
    spaceship = {
      fuel: 100,
      food: 50,
      oxygen: 100,
      health: 100,
      shields: 100,
      energy: 100,
      water: 50,
    };
    updateResourceArea();
    document.getElementById('outputText').textContent = 'Welcome to Cosmic Journey! Type "explore" or "encounter" to begin.';
    document.getElementById('input').disabled = false;
  }
  
  function submitChoice() {
    if (isGameOver) {
      restartGame();
      return;
    }
  
    let inputElement = document.getElementById('input');
    let choice = inputElement.value.trim().toLowerCase();
  
    if (choice === 'explore') {
      explorePlanet();
    } else if (choice === 'encounter') {
      encounterAlien();
    } else if (choice === 'exit') {
      document.getElementById('outputText').textContent = 'Exiting the game. Thanks for playing!';
      inputElement.disabled = true;
    } else {
      document.getElementById('outputText').textContent = 'Invalid choice. Please try again.';
    }
  
    previousInput = choice;
    inputElement.value = '';
  }
  
  document.addEventListener('keyup', function(event) {
    if (event.key === 'ArrowUp') {
      document.getElementById('input').value = previousInput;
    }
  });