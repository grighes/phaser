// New name for the state
var playState = {

  create: function() {

    // This will run in Canvas mode, so let's gain a little speed and display
    game.renderer.clearBeforeRender = false;
    game.renderer.roundPixels = true;

    // The scrolling starfield background
    starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');

    // The hero!
    //player = game.add.sprite(163, 157, 'player');
    player = game.add.sprite(60, 247, 'player');
    player.anchor.setTo(0.5);

    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.drag.set(100);
    player.body.maxVelocity.set(200);

    //  The invaders
    aliens = game.add.group();
    aliens.enableBody = true;
    aliens.physicsBodyType = Phaser.Physics.ARCADE;

    this.createAliens();

    // Game input
    cursors = game.input.keyboard.createCursorKeys();
    // game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // The score
    scoreString = 'Score : ';
    scoreText = game.add.text(10, 10, scoreString + score, {
      font: '34px Arial',
      fill: '#fff'
    });

    // Lives
    lives = game.add.group();
    game.add.text(game.world.width - 100, 10, 'Lives : ', {
      font: '34px Arial',
      fill: '#fff'
    });

    for (var i = 0; i < 3; i++) {
      var life = lives.create(game.world.width - 100 + (30 * i), 60, 'life');
      life.anchor.setTo(0.5, 0.5);
      life.angle = 90;
      life.alpha = 0.4;
    }

    //  Our ships bullets
    /*    bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 1);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);*/

    //  Our bullet group
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    // The enemy's bullets
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(30, 'enemyBullet');
    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 1);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);

    /*//  All 40 of them
    bullets.createMultiple(40, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);*/

    //  An explosion pool
    explosions = game.add.group();
    explosions.createMultiple(30, 'kaboom');
    explosions.forEach(this.setupInvader, this);


  },

  update: function() {
    //  Scroll the background
    starfield.tilePosition.x -= 5;

    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
    player.body.angularVelocity = 0;

    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      player.body.angularVelocity = -200;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      player.body.angularVelocity = 200;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      game.physics.arcade.velocityFromAngle(player.angle, 300, player.body.velocity);
    }

    /*if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      this.fireBullet();
    }*/

    if (fireButton.isDown) {
      this.fireBullet();
    }

    if (game.time.now > firingTimer) {
      // this.enemyFires();
    }

    //  Run collision
    game.physics.arcade.overlap(bullets, aliens, this.collisionHandler, null, this);
    game.physics.arcade.overlap(enemyBullets, player, this.enemyHitsPlayer, null, this);

    // Function to continue cenario
    // this.screenWrap(player);
    // bullets.forEachExists(this.screenWrap, this);

  },

  fireBullet: function() {

    if (game.time.now > bulletTime) {
      bullet = bullets.getFirstExists(false);

      if (bullet) {
        bullet.reset(player.body.x + 16, player.body.y + 16);
        bullet.lifespan = 2000;
        bullet.rotation = player.rotation;
        game.physics.arcade.velocityFromRotation(player.rotation, 400, bullet.body.velocity);
        bulletTime = game.time.now + 50;
      }
    }

  },

  collisionHandler: function(bullet, alien) {

    //  When a bullet hits an alien we kill them both
    bullet.kill();
    alien.kill();

    //  Increase the score
    score += 20;
    scoreText.text = scoreString + score;

    //  And create an explosion :)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(alien.body.x, alien.body.y);
    explosion.play('kaboom', 30, false, true);

    if (aliens.countLiving() == 0) {
      score += 1000;
      scoreText.text = scoreString + score;

      enemyBullets.callAll('kill', this);
      stateText.text = " You Won, \n Click to restart";
      stateText.visible = true;

      //the "click to restart" handler
      game.input.onTap.addOnce(this.restart,this);
    }

  },

  enemyHitsPlayer: function(player, bullet) {

    bullet.kill();

    live = lives.getFirstAlive();

    if (live) {
      live.kill();
    }

    //  And create an explosion :)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(player.body.x, player.body.y);
    explosion.play('kaboom', 30, false, true);

    // When the player dies
    if (lives.countLiving() < 1) {
      player.kill();
      enemyBullets.callAll('kill');

      stateText.text = " GAME OVER \n Click to restart";
      stateText.visible = true;

      //the "click to restart" handler
      game.input.onTap.addOnce(this.restart, this);
    }

  },

  createAliens: function() {

    for (var y = 0; y < 4; y++) {
      for (var x = 0; x < 10; x++) {
        var alien = aliens.create(x * 48, y * 50, 'invader');
        alien.anchor.setTo(0.5, 0.5);
        // alien.animations.add('fly', [0, 1, 2, 3], 20, true);
        // alien.play('fly');
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
    tween.onLoop.add(this.descend, this);
  },

  /*  render: function() {

      game.debug.spriteInfo(player, 32, 32);
      game.debug.text('angularVelocity: ' + player.body.angularVelocity, 32, 200);
      game.debug.text('angularAcceleration: ' + player.body.angularAcceleration, 32, 232);
      game.debug.text('angularDrag: ' + player.body.angularDrag, 32, 264);
      // game.debug.text('deltaZ: ' + player.body.deltaZ(), 32, 296);

    },*/

  // Function to continue cenario
  screenWrap: function(sprite) {

    if (player.x < 0) {
      player.x = game.width;
    }
    else if (player.x > game.width) {
      player.x = 0;
    }

    if (player.y < 0) {
      player.y = game.height;
    }
    else if (player.y > game.height) {
      player.y = 0;
    }

  },

  setupInvader: function(invader) {

    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animations.add('kaboom');

  },

  descend: function() {

    aliens.y += 10;

  },

  resetBullet: function(bullet) {

    //  Called if the bullet goes out of the screen
    bullet.kill();

  },

  restart: function() {

    //  A new level starts

    //resets the life count
    lives.callAll('revive');
    //  And brings the aliens back from the dead :)
    aliens.removeAll();
    this.createAliens();

    //revives the player
    player.revive();
    //hides the text
    stateText.visible = false;

  },

  /*// No changes
  playerDie: function() {
    // When the player dies, we go to the menu
    game.state.start('menu');
  },*/
};
