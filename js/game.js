// Initialise Phaser
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

// Define our 'global' variable
// game.global = {
    
// };

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
var gametrack;
var heroLaser;
var heroLaserExtra;
var imagemDePontuacao;
var lives;
var livingEnemies = [];
var player;
var pause;
var score1 = 0;
var scoreTotal = 0;
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
var sea;
var timer = 0;
var restart;

// Add all the states
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play1', playState1);
game.state.add('play2', playState2);
game.state.add('play3', playState3);
game.state.add('gameOver', gameOverState);
game.state.add('won', wonState);

// Start the 'boot' state
game.state.start('boot');