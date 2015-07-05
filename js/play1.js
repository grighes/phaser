// New name for the state
var playState1 = {

  create: function() {

    // This will run in Canvas mode, so let's gain a little speed and display
    game.renderer.clearBeforeRender = false;
    game.renderer.roundPixels = true;

    // The scrolling background
    background = game.add.tileSprite(0, 0, 800, 600, 'backgroundGame');

    // The hero!
    player = game.add.sprite(60, 300, 'player');
    player.anchor.setTo(0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;
    player.body.maxVelocity.set(200);

    // The invaders - Fase um
    aliens = game.add.group();
    aliens.enableBody = true;
    aliens.physicsBodyType = Phaser.Physics.ARCADE;
    aliens.createMultiple(10, 'invader');

    // Chama a função createAliens para cada inimigo morto
    game.time.events.loop(1000, this.createAliens, this);


    // Game input
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    /* Implentar pause e sombra ainda! */

    // Pause Game
    // spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.P);
    // spaceKey.onDown.add(this.togglePause, this);

    /*
    shadow = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    shadow.anchor.set(0.5);
    shadow.tint = 0x000000;
    shadow.alpha = 0.6;
    */

    //  Text
    stateText = game.add.text(game.world.centerX, game.world.centerY, ' ', {
      font: '24px Play',
      fill: 'red',
      shadow: '(5, 5, rgba(0,0,0,0.5), 15)'
    });

    stateText.anchor.setTo(0.5);
    stateText.visible = false;

    this.criaTextoDePontuacao();

    //  Our bullet group
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    // The enemy's bullets
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(30, 'enemyBullet');
    enemyBullets.setAll('anchor.x', 1.5);
    enemyBullets.setAll('anchor.y', 1.5);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);

    //  An explosion pool
    explosions = game.add.group();
    explosions.createMultiple(30, 'kaboom');
    explosions.forEach(this.setupInvader, this);

    // Laser sound hero
    heroLaser = game.add.audio('heroLaser');
    heroLaserExtra = game.add.audio('heroLaserExtra');
    heroLaser.volume = 0.9;

    // Laser sound enemy
    enemyLaser = game.add.audio('enemyLaser');
    enemyLaser.volume = 0.4;

    // Explosion sound
    explosionSound1 = game.add.audio('explosionSound1');
    explosionSound2 = game.add.audio('explosionSound2');
    explosionSound1.volume = 0.9;
    explosionSound2.volume = 0.9;

    // Enemys passing
    enemysPassing.volume = 0.3;
    enemysPassing.loop = true;
    enemysPassing.play();

    // Create the emitter with 15 particles. We don't need to set the x and y
    // Since we don't know where to do the explosion yet

    this.emitter = game.add.emitter(0, 0, 15);

    // Set the 'pixel' image for the particles

    this.emitter.makeParticles('pixel');

    // Set the y speed of the particles between -150 and 150

    // The speed will be randomly picked between -150 and 150 for each particle

    this.emitter.setYSpeed(-150, 150);

    // Do the same for the x speed

    this.emitter.setXSpeed(-150, 150);

    // Use no gravity for the particles

    this.emitter.gravity = 0;

    // Emit different particles
    this.emitter.makeParticles(['pixel']);

    // Scale the particles
    this.emitter.minParticleScale = 1;
    this.emitter.maxParticleScale = 0.7;

    // Rotate the particles
    this.emitter.minRotation = 10;
    this.emitter.maxRotation = 100;

    // Change the size of the emitter
    this.emitter.width = 69;
    this.emitter.height = 42;

  },

  update: function() {
    //  Scroll the background
    background.tilePosition.x -= 2;

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

      //  Scroll the background
      background.tilePosition.x -= 3;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      game.physics.arcade.velocityFromAngle(player.angle, -50, player.body.velocity);
    }

    if (fireButton.isDown) {
      this.fireBullet();
    }

    if (game.time.now > firingTimer) {
      this.enemyFires();
    }

    //  Run collision
    game.physics.arcade.overlap(bullets, aliens, this.collisionHandler, null, this);
    game.physics.arcade.overlap(enemyBullets, player, this.enemyHitsPlayer, null, this);
    game.physics.arcade.overlap(aliens, player, this.colision, null, this);
    game.physics.arcade.collide(aliens);


  },


  //Cria o texto de pontuação
  criaTextoDePontuacao: function() {

    //Cria imagem
    // imagemDePontuacao = game.add.bitmapData(800, 30);

    //Define a cor de fundo dessa imagem
    // imagemDePontuacao.context.fillStyle = "#333";

    //Define o formato de retângulo para essa imagem
    // imagemDePontuacao.context.fillRect(0, 0, 800, 30);

    //Cria sprite e adiciona no jogo
    // spriteDePontuacao = game.add.sprite(0, 0, imagemDePontuacao);

    // The score
    scoreString = 'Score: ';
    scoreText = game.add.text(20, 3, scoreString + score, {
      font: '25px Play',
      fill: '#fff'
    });

    // Counter Dead Enemys
    counterDeadString = 'To kill: ';
    counterDeadText = game.add.text(200, 3, counterDeadString + counterDead, {
      font: '25px Play',
      fill: '#fff'
    });

    // Lives
    lives = game.add.group();

    for (var i = 0; i < 1; i++) {
      var life = lives.create(game.world.width - 100 + (30 * i), 60, 'life');
      life.anchor.setTo(3, 0);
      life.angle = 90;
      life.alpha = 0.4;
    }

    //Faz sprite seguir a câmera
    //spriteDePontuacao.fixedToCamera = true;

    //Cria texto de pontuação
    /*textoDePontuacao = game.add.text(20, 20, "Score: " + game.global.score, {
      font: "18px Arial",
      fill: "#A7D4C7",
      align: "left"
    });*/

    //Faz texto de pontuação seguir a câmera
    //textoDePontuacao.fixedToCamera = true;
  },

  createAliens: function() {

    newAliens = aliens.getFirstDead();
    if (newAliens == null) {
      game.state.start('play1');
    }
    else {
      newAliens.reset(game.world.centerX, game.world.randomY);
      aliens.x = 600;

      // velocidade
      aliens.setAll('body.velocity.x', -150);
      // newAliens.body.bounce.x = 1;
      newAliens.checkWorldBounds = true;
      newAliens.outOfBoundsKill = true;

    }
  },

  setupInvader: function(invader) {

    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animations.add('kaboom');

  },


  createBoss: function() {
    bossOne.x = 100;
    bossOne.y = 50;
    var boss = bossOne.create(x * 48, y * 50, 'bossOne');
    var tween = game.add.tween(bossOne).to({
      x: 200
    }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
  },

  collisionHandler: function(bullet, alien) {

    // When a bullet hits an alien we kill them both
    bullet.kill();
    alien.kill();

    // Increase the score
    score += 30;
    scoreText.text = scoreString + score;

    // Decrease total Enemys Dead
    counterDead--;
    counterDeadText.text = counterDeadString + counterDead;

    // And create an explosion :)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(alien.body.x, alien.body.y);
    explosion.play('kaboom', 30, false, true);
    explosionSound1.play();
    explosionSound2.play();


    if (alien.kill()) {
      nDeath++;
    }

    if (nDeath == 10) {

      // original
      score += 1000;
      scoreText.text = scoreString + score;

      // esperar user dar enter para começar nova fase
      enemyBullets.callAll('kill', this);

      // stateText.text = "You Won, \n Click to restart";
      // stateText.visible = true;
      stageOneAudio.stop();
      counterDead = 30;
      nDeath = 0;
      game.state.start('play2');

      //the "click to restart" handler
      game.input.onTap.addOnce(this.restart, this);
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
    explosionSound1.play();
    explosionSound2.play();

    // When the player dies
    if (lives.countLiving() < 1) {
      player.kill();
      if (bullet) {
        bullet.kill();
      }
      enemyBullets.callAll('kill');

      // Set the position of the emitter on the player
      this.emitter.x = player.x;
      this.emitter.y = player.y;

      // Start the emitter, by exploding 15 particles that will live for 600ms
      this.emitter.start(true, 600, null, 15);

      stateText.text = "GAME OVER";
      stateText.visible = true;
      nDeath = 0;
      //the "click to restart" handler
      game.input.onTap.addOnce(this.restart, this);
    }

  },

  colision: function(player, alien) {

    live = lives.getFirstAlive();

    if (live) {
      live.kill();
    }

    //  And create an explosion :)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(player.body.x, player.body.y);
    explosion.play('kaboom', 30, false, true);
    explosionSound1.play();
    explosionSound2.play();

    // When the player dies
    if (lives.countLiving() < 1) {
      player.kill();

      // Set the position of the emitter on the player
      this.emitter.x = player.x;
      this.emitter.y = player.y;

      // Start the emitter, by exploding 15 particles that will live for 600ms
      this.emitter.start(true, 600, null, 15);

      stateText.text = "GAME OVER";
      stateText.visible = true;
      nDeath = 0;
      //the "click to restart" handler
      game.input.onTap.addOnce(this.restart, this);
    }

  },

  enemyFires: function() {

    //  Grab the first bullet we can from the pool
    enemyBullet = enemyBullets.getFirstExists(false);

    livingEnemies.length = 0;

    aliens.forEachAlive(function(alien) {

      // put every living enemy in an array
      livingEnemies.push(alien);
    });

    if (enemyBullet && livingEnemies.length > 0) {
      var random = game.rnd.integerInRange(0, livingEnemies.length - 1);
      // randomly select one of them
      var shooter = livingEnemies[random];
      // And fire the bullet from this enemy
      enemyBullet.reset(shooter.body.x, shooter.body.y);
      game.physics.arcade.moveToObject(enemyBullet, player, 120);
      firingTimer = game.time.now + 2000;
      enemyLaser.play();
    }

  },

  fireBullet: function() {

    if (game.time.now > bulletTime) {
      bullet = bullets.getFirstExists(false);

      if (bullet) {
        bullet.reset(player.body.x + 20, player.body.y + 18);
        bullet.lifespan = 1000;
        bullet.rotation = player.rotation;
        game.physics.arcade.velocityFromRotation(player.rotation, 400, bullet.body.velocity);
        bulletTime = game.time.now + 250;
        heroLaser.play();
        heroLaserExtra.play();
        /*
        bullet.reset(player.x, player.y + 8);
        bullet.body.velocity.y = -400;
        bulletTime = game.time.now + 200;
        */
      }
    }

  },

  resetBullet: function(bullet) {

    //  Called if the bullet goes out of the screen
    bullet.kill();

  },

  /*render: function() {
    game.debug.spriteInfo(player, 32, 32);
    game.debug.text('angularVelocity: ' + player.body.angularVelocity, 32, 200);
    game.debug.text('angularAcceleration: ' + player.body.angularAcceleration, 32, 232);
    game.debug.text('angularDrag: ' + player.body.angularDrag, 32, 264);
    // game.debug.text('deltaZ: ' + player.body.deltaZ(), 32, 296);
  },*/

  // Function to continue cenario
  /*screenWrap: function(sprite) {

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

  },*/

  restart: function() {

    //  A new level starts

    //  resets the life count
    lives.callAll('revive');
    //  And brings the aliens back from the dead :)
    aliens.removeAll();

    this.createAliens();

    //  revives the player
    player.revive();
    //  hides the text
    stateText.visible = false;

  },

};