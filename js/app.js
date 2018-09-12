// Enemies our player must avoid
var Enemy = function(n, speedMultiplier) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
   
    this.x = n*0;
    this.y = (n * 83) - 20;
    this.speed= speedMultiplier * 50;
   
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt ;
    if(this.x>500){
        this.x =0;
    }
 
    if((player.x+10 >= this.x) && (player.x+10 <= (this.x + 80))) { 
        if((player.y+10 >= this.y) && (player.y+10 <= (this.y+100))){
                player.x = 303;
                player.y = 332;
                
                score=0;
                if(allEnemies.length >= 4) {
                    allEnemies.pop();
                }
                document.getElementById('updateScore').innerHTML = score;

        }
    }

    if((player.x+80 >= this.x) && (player.x+80 <= (this.x + 80))) { 
        if((player.y+60 >= this.y) && (player.y+60 <= (this.y+100))){
                player.x = 303;
                player.y = 332;
                
                score = 0;
                if(allEnemies.length >= 4) {
                    allEnemies.pop();
                }
                document.getElementById('updateScore').innerHTML = score;
        }
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
//var score =0;   
 
class Player {
    constructor(){
        this.x = 303
        this.y = 332
        this.speed = 100;
        this.sprite = 'images/char-boy.png'; 

    }
}
 

Player.prototype.update = function(dt) {
   
   player.checkVictory(); 

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(input){
    switch(input){
        case 'left':
            console.log("Left", this.x);
                this.x -=  101;
                if (this.x < 0){
                    this.x = 0;
                }
            break;

        case 'up':
            console.log("Up",this.y);
            this.y -= 83;
            if(this.y < 0){
                this.y = 0;
            }
            
            break;

        case 'right':
            console.log("Right",this.x);
            this.x += 101;
            
            if(this.x > 420){
                this.x -= 101;
            }
            break;

        case 'down':
            console.log("Down", this.y);
            this.y += 83;
            if(this.y > 450){
                this.y -= 83;
            }
            break;
    }
};



Player.prototype.checkVictory = function(){
   
    if(this.y<33) {
        score++;
        document.getElementById('updateScore').innerHTML = score;
        player.x =303;
        player.y = 332;
        setTimeout( function () {

        },3000);
        if(score===2){
            var enemyFour = new Enemy(3, 4);
            allEnemies.push(enemyFour);
        }

    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemyOne = new Enemy(1, 3);
var enemyTwo = new Enemy(2, 3);
var enemyThree = new Enemy(3, 5);

const allEnemies = [];
allEnemies.push(enemyOne);
allEnemies.push(enemyTwo);
allEnemies.push(enemyThree);
var player = new Player();
var score=0;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
