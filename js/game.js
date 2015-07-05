// Initialise Phaser
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

// Define our 'global' variable
game.global = {
    score: 0
};

var aliens;
var bullets;
var bulletTime = 0;
var bossOne
var cursors;
var counterDead = 10;
var counterDeadText;
var counterDeadString = '';
var explosions;
var enemyBullet;
var enemyLaser;
var explosionSound1;
var explosionSound2;
var enemysPassing;
var fireButton;
var firingTimer = 0;
var heroLaser;
var heroLaserExtra;
var imagemDePontuacao;
var lives;
var livingEnemies = [];
var player;
var pause;
var score = 0;
var scoreString = '';
var scoreText;
var startLabel;
var starfield;
var stateText;
var shadow;
var showDebug = true;
var nDeath = 0;
var newAliens;
var menuAudio;
var stageOneAudio;
var timer = 0;


// Add all the states
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play1', playState1);
game.state.add('play2', playState2);
// game.state.add('play3', playState3);

// Start the 'boot' state
game.state.start('boot');