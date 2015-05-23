// New name for the state
var playState = {

    create: function() {

        //  The scrolling starfield background
        starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');


        //  The hero!
        player = game.add.sprite(400, 500, 'player');
        player.anchor.setTo(0.5, 0.5);
        game.physics.enable(player, Phaser.Physics.ARCADE);


        //  The score
        scoreString = 'Score : ';
        scoreText = game.add.text(10, 10, scoreString + score, {
            font: '34px Arial',
            fill: '#fff'
        });
        
        //  Lives
        lives = game.add.group();
        game.add.text(game.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#fff' });

        for (var i = 0; i < 3; i++) {
            var ship = lives.create(game.world.width - 100 + (30 * i), 60, 'player');
            ship.anchor.setTo(0.5, 0.5);
            ship.angle = 90;
            ship.alpha = 0.4;
        }

    },

    createAliens: function() {

        for (var y = 0; y < 4; y++) {
            for (var x = 0; x < 10; x++) {
                var alien = aliens.create(x * 48, y * 50, 'enemy');
                alien.anchor.setTo(0.5, 0.5);
                alien.animations.add('fly', [0, 1, 2, 3], 20, true);
                alien.play('fly');
                alien.body.moves = false;
            }
        }

        aliens.x = 100;
        aliens.y = 50;

        //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
        var tween = game.add.tween(aliens).to({
            x: 200
        }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

        //  When the tween loops it calls descend
        tween.onLoop.add(descend, this);
    },
    
    update: function() {
        //  Scroll the background
        starfield.tilePosition.y += 5;
    },
    
    // No changes
    playerDie: function() {
        // When the player dies, we go to the menu
        game.state.start('menu');
    },
};
