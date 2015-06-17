// Initialise Phaser
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

// Define our 'global' variable
game.global = {
    score: 0
};

var aliens;
var bullets;
var bulletTime = 0;
var cursors;
var explosions;
var enemyBullet;
var fireButton;
var firingTimer = 0;
var lives;
var livingEnemies = [];
var player;
var score = 0;
var scoreString = '';
var scoreText;
var starfield;
var stateText;
var shadow;
var spaceKey;
var showDebug = true;
var nDeath = 0;

// Add all the states
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play1', playState1);
game.state.add('play2', playState2);

// Start the 'boot' state
game.state.start('boot');