// Initialise Phaser
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

// Define our 'global' variable
game.global = {
    score: 0
};

var player;
var aliens;
var score = 0;
var scoreString = '';
var scoreText;
var lives;
var starfield;
var bullet;
var bullets;
var bulletTime = 0;
var cursors;
var explosions;
var enemyBullet;
var fireButton;
var firingTimer = 0;
var stateText;
var livingEnemies = [];

// Add all the states
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);

// Start the 'boot' state
game.state.start('boot');