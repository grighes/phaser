var loadState = {

    preload: function() {
        // Add a background image
        game.add.image(0, 0, 'background');

        // Add a 'loading...' label on the screen
        var loadingLabel = game.add.text(game.world.centerX, 150, 'loading...', {
            font: '30px Arial',
            fill: '#ffffff'
        });
        
        loadingLabel.anchor.setTo(0.5, -2);
        
        // Display the progress bar
        
        var progressBar = game.add.sprite(game.world.centerX, 200, 'progressBar');
        progressBar.anchor.setTo(0.5, -3);
        game.load.setPreloadSprite(progressBar);

        // Load all our assets
        game.load.image('player', 'assets/player3.png');
        game.load.image('bullet', 'assets/bullets.png');
        game.load.image('life', 'assets/green_ball.png');
        game.load.image('invader', 'assets/alien-sprite.png');
        game.load.image('enemyBullet', 'assets/enemy-bullet.png');
        game.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
        // game.load.image('bullet', 'assets/bullets.png');

        /* Play2 */

        // game.load.image('sand', 'assets/sand.jpg');
        game.load.image('space', 'assets/deep-space.jpg');

        // Load a new asset that we will use in the menu state
        game.load.image('introTexture', 'assets/spaceBackground.jpg');
        game.load.image('backgroundGame', 'assets/water_texture.jpg');

        /* Sounds */

        // Sound in menu game
        game.load.audio('menu-audio', ['sounds/menu-audio.mp3']);

        // Sound when fase one start
        game.load.audio('sea', ['sounds/sea.mp3']);

        // Sound when hero shoot
        game.load.audio('heroLaser', ['sounds/laser7.mp3']);
        game.load.audio('heroLaserExtra', ['sounds/laser4.mp3']);
        
        // Sound when enemy shoot
        game.load.audio('enemyLaser', ['sounds/laser4.mp3']);
        
        // Explosion sound
        game.load.audio('explosionSound1', ['sounds/explosion1.wav']);
        game.load.audio('explosionSound2', ['sounds/explosion2.wav']);
        
        // Alien passing sound
        game.load.audio('enemysPassing', ['sounds/spaceships-passing.mp3']);

        
    },

    create: function() {
        // Go to the menu state
        game.state.start('menu');
    }
};