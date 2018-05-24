var game = new Phaser.Game(500, 800, Phaser.AUTO, 'lawn-water'

);

var player;
var catplayer;
var soil;
var cursors;
var water;
var spray;
var sprayTimer = 0;
var shotCount = 0;
var goodShot = 0;
var score = 0;
var grassPatch;
var bgrassPatch;
var dog;
var leftButton;
var rightButton;
var xpos;
var ypos;
var ypos1;
var xpos1;
var text;
var goodShotText;
var slashes;
var gcat;
var timer;
var total = 0;
var meow;
var splash;
var boop;
var drink;
var gamemode = 0;
var starfield;
var hose;
var cattrail;
var nyanmy;
var nyansong;
var endButton;
var watertrail;
var brownGrassCount = 0;
var waterR;
var bulletTrail;
var accuracy = 0;
var patchMiss;
var bgm;
var threshold;
var cookiecheck = false;


// boot state for the game, prior to menu
var bootState = {

  create: function () {
    // menu state and also prevents it from resizing
    game.state.start('menu');
    resize();
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

  }





}
// menu for game, contains help and start button
var menuState = {

  preload: function () {

    game.load.image('start', 'assets/start.png');
    game.load.image('soil', 'assets/soil.png');
        game.load.image('soil', 'assets/soil.png');
    game.load.image('hose', 'assets/hose.png');
    game.load.image('trail', 'assets/hosetrail.png');
    game.load.image('water', 'assets/water.png');
    game.load.image('grass', 'assets/grass.png');
    game.load.image('bgrass', 'assets/browngrass.png');
    game.load.image('button', 'assets/leftbutton.png');
    game.load.image('Rbutton', 'assets/Spray.png');
    game.load.image('dog', 'assets/dog.png');
    game.load.image('gcat', 'assets/grumpycat3.png');
//    game.load.spritesheet('slash', 'assets/grumpycatws2.png', 400, 400);
//    game.load.audio('meow', 'assets/catmeow.mp3');
//    game.load.audio('splash', 'assets/splash.mp3');
//    game.load.audio('boop', 'assets/boop.mp3');
//    game.load.audio('drink', 'assets/drink.mp3');
//    game.load.audio('nyansong', 'assets/nyan_cat.mp3');
//    game.load.audio('bgm', 'assets/bgm.mp3');
//    game.load.image('nyancat', 'assets/nyancat.png');
//    game.load.image('nyancattrail', 'assets/nyancattrail.png');
//    game.load.image('nyancattrail2', 'assets/nyancattrailh.png');
//    game.load.image('nyancat2', 'assets/nyancath.png');
//    game.load.image('starfield', 'assets/starfield.jpeg');
//    game.load.image('waterR', 'assets/waterR.png');
//    game.load.image('tweet', 'assets/twitter.png');
    resize();
  },
  create: function () {
    resize();

    // adds the starting background and additional labels
    var background = game.add.tileSprite(0, 0, 1024, 900, 'soil');

    var nameLabel = game.add.text(70, 200, 'Water Day Dash', {
      font: '50px Arial',
      fill: '#000000'
    });

    if (!getCookie("username")) {
      var cookieLabel = game.add.text(10, 600, 'You are not logged in, your score will not be saved', {
        font: '20px Arial',
        fill: '#000000'
      })

      //alert("You are not logged in, your score will not be saved");
    }
    console.log(getCookie("username"));

    var tipLabel = game.add.text(20, 300, 'Mobile : Use one hand to move (drag or tap) and one \n hand to hit the spray button', {
      font: '20px Arial',
      fill: '#000000'
    });
    var tipLabel2 = game.add.text(20, 400, 'Keyboard : Left and Right arrow keys \n to move and Space to Shoot', {
      font: '25px Arial',
      fill: '#000000'
    });

    var startLabel = game.add.text(10, game.world.height - 80, 'Hit the start button or press the spacebar key to start', {
      font: '20px Arial',
      fill: '#000000'
    });

    var startButton = game.add.button(0, 500, 'start', this.start);


    var spacekey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spacekey.onDown.addOnce(this.start, this);

  },

  start: function () {
    game.state.start('play');
  },


};
// win state that shows final score and link to high scores.
var winState = {
  preload: function () {
    game.load.image('hsbutton', 'assets/hsbutton.png');
  },
  create: function () {
    if (shotCount != 0) {
      accuracy = Math.round(goodShot * 100 / shotCount);
    } else {
      accuracy = 0;
    }
    patchMiss = brownGrassCount - goodShot;
    var scoreButton = game.add.button(-30, 500, 'hsbutton', this.score);
    var tweetButton = game.add.button(-30, 600, 'tweet', this.tweetMe);


    // ends the background music 
    nyansong.destroy();
    bgm.destroy();

    calcScore();
    //makeCookie3("score",score);
    //console.log(getCookie("score"));
    //
    //    if (score > 60) {
    //      threshold = 2
    //    };
    //    if (score > 40 && score < 60) {
    //      threshold = 1
    //    };
    //    if (score < 40) {
    //      threshold = 0
    //    };

    if (score > 70) {
      threshold = 5
    } else if (score > 60) {
      threshold = 4
    } else if (score > 50) {
      threshold = 3
    } else if (score > 40) {
      threshold = 2
    } else if (score > 30) {
      threshold = 1
    } else {
      threshold = 0
    }
    console.log(threshold);
    makeCookie3("threshold", threshold);

    var username = getCookie("username");

    //labels for the end screen telling score 
    var winLabel = game.add.text(70, 200, 'Times up', {
      font: '50px Arial',
      fill: '#ffffff'
    });

    var startLabel = game.add.text(200, game.world.height / 2, 'Your final score ' + score, {
      font: '25px Arial',
      fill: '#ffffff'
    });
    var accLabel = game.add.text(200, 300, 'Patches missed ' + patchMiss, {
      font: '25px Arial',
      fill: '#ffffff'
    });

    var accLabel = game.add.text(200, 350, 'Accuracy ' + accuracy + '%', {
      font: '25px Arial',
      fill: '#ffffff'
    });

    $.ajax({
      method: "POST",
      url: "shooterphp.php",
      data: {
        username: username,
        score: score,
        tier: threshold
      },
      dataType: "text",
      success: function (data) {
        console.log(data);

      }

    });
  },

  score: function () {
    window.location.href = "scores.html";
  },


  // twitter api function
  tweetMe: function () {
    var twittertext = 'My Watering lawn score today was ' + score + '! Try to beat me at ' + 'www.project-water.ca' + '. ' + '%23projectwaterapp';
    var outTweet = 'http://twitter.com/home?status=' + twittertext;
    window.open(outTweet, '_blank');
  },




}

var playState = {
  // preloading all the game stuff
  preload: function () {
//    game.load.image('soil', 'assets/soil.png');
//    game.load.image('hose', 'assets/hose.png');
//    game.load.image('trail', 'assets/hosetrail.png');
//    game.load.image('water', 'assets/water.png');
//    game.load.image('grass', 'assets/grass.png');
//    game.load.image('bgrass', 'assets/browngrass.png');
//    game.load.image('button', 'assets/leftbutton.png');
//    game.load.image('Rbutton', 'assets/Spray.png');
//    game.load.image('dog', 'assets/dog.png');
//    game.load.image('gcat', 'assets/grumpycat3.png');
    game.load.spritesheet('slash', 'assets/grumpycatws2.png', 400, 400);
    game.load.audio('meow', 'assets/catmeow.mp3');
    game.load.audio('splash', 'assets/splash.mp3');
    game.load.audio('boop', 'assets/boop.mp3');
    game.load.audio('drink', 'assets/drink.mp3');
    game.load.audio('nyansong', 'assets/nyan_cat.mp3');
    game.load.audio('bgm', 'assets/bgm.mp3');
    game.load.image('nyancat', 'assets/nyancat.png');
    game.load.image('nyancattrail', 'assets/nyancattrail.png');
    game.load.image('nyancattrail2', 'assets/nyancattrailh.png');
    game.load.image('nyancat2', 'assets/nyancath.png');
    game.load.image('starfield', 'assets/starfield.jpeg');
    game.load.image('waterR', 'assets/waterR.png');
    game.load.image('tweet', 'assets/twitter.png')



  },
  create: function () {
    // prevents game from being zoomed in
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    canvas_width = window.innerWidth * window.devicePixelRatio;
    canvas_height = window.innerHeight * window.devicePixelRatio;

    // timer for the game 

    timer = game.time.create(false);
    timer.loop(1000, updateCounter, this);
    timer.start();

    game.input.addPointer();
    game.input.addPointer();

    //backgrounds
    soil = game.add.tileSprite(0, 0, 1024, 900, 'soil');
    starfield = game.add.tileSprite(0, 0, 1024, 900, 'starfield');
    //easteregg background intially turned off
    starfield.alpha = 0;

    // player sprite 
    hose = game.add.sprite(250, 650, 'hose');
    player = hose;
    catplayer = game.add.sprite(250, 650, 'nyancat');
    player.anchor.setTo(0.5, 0.5);
    catplayer.anchor.setTo(0.5, 0.5);
    // easter egg player sprite turned off 
    catplayer.alpha = 0;
    game.physics.enable(player, Phaser.Physics.ARCADE);


    rightButton = game.add.button(game.world.centerX - game.world.centerX / 2, 725, 'Rbutton', actionOnClick);

    // sounds 
    meow = game.add.audio('meow');
    meow.allowMultiple = true;
    splash = game.add.audio('splash');
    splash.allowMultiple = true;
    boop = game.add.audio('boop');
    boop.allowMultiple = true;
    drink = game.add.audio('drink');
    drink.allowMultiple = true;
    nyansong = game.add.audio('nyansong');
    nyansong.allowMultiple = false;
    bgm = game.add.audio('bgm');
    bgm.allowMultiple = false;
    bgm.loopFull();


    // emitter for the player 
    cursors = game.input.keyboard.createCursorKeys();
    hoseTrail = game.add.emitter(player.x, player.y + 20, 400);
    hoseTrail.makeParticles('trail');
    hoseTrail.setXSpeed(0);
    hoseTrail.setYSpeed(200, 180);
    hoseTrail.setRotation(50, -50);
    hoseTrail.start(false, 5000, 10);


    // water projectile
    water = game.add.group();
    water.enableBody = true;
    water.physicsBodyType = Phaser.Physics.ARCADE;
    water.createMultiple(20, 'water');
    water.setAll('anchor.x', 0.5);
    water.setAll('anchor.y', 1);
    water.setAll('outOfBoundsKill', true);
    water.setAll('checkWorldBounds', true);
    // Easter egg projectile

    waterR = game.add.group();
    waterR.enableBody = true;
    waterR.physicsBodyType = Phaser.Physics.ARCADE;
    waterR.createMultiple(20, 'waterR');
    waterR.setAll('anchor.x', 0.5);
    waterR.setAll('anchor.y', 1);
    waterR.setAll('outOfBoundsKill', true);
    waterR.setAll('checkWorldBounds', true);



    // enemies aka grass patches 

    grassPatch = game.add.group();
    grassPatch.enableBody = true;
    grassPatch.physicsBodyType = Phaser.Physics.ARCADE;
    grassPatch.createMultiple(20, 'grass');
    grassPatch.setAll('anchor.x', 0.5);
    grassPatch.setAll('anchor.y', 0.5);
    grassPatch.setAll('scale.x', 1.0);
    grassPatch.setAll('scale.y', 1.0);
    grassPatch.setAll('outOfBoundsKill', true);
    grassPatch.setAll('checkWorldBounds', true);
    launchGrassPatch();

    // brown grass patches 

    bgrassPatch = game.add.group();
    bgrassPatch.enableBody = true;
    bgrassPatch.physicsBodyType = Phaser.Physics.ARCADE;
    bgrassPatch.createMultiple(20, 'bgrass');
    bgrassPatch.setAll('anchor.x', 0.5);
    bgrassPatch.setAll('anchor.y', 0.5);
    bgrassPatch.setAll('scale.x', 1.0);
    bgrassPatch.setAll('scale.y', 1.0);
    bgrassPatch.setAll('outOfBoundsKill', true);
    bgrassPatch.setAll('checkWorldBounds', true);
    launchbGrassPatch();


    // creating the dogs 
    dog = game.add.group();
    dog.enableBody = true;
    dog.physicsBodyType = Phaser.Physics.ARCADE;
    dog.createMultiple(5, 'dog');
    dog.setAll('anchor.x', 0.5);
    dog.setAll('anchor.y', 0.5);
    dog.setAll('scale.x', 1.0);
    dog.setAll('scale.y', 1.0);
    dog.setAll('outOfBoundsKill', true);
    dog.setAll('checkWorldBounds', true);
    launchDog();

    // easter egg enemies 
    nyanmy = game.add.group();
    nyanmy.enableBody = true;
    nyanmy.physicsBodyType = Phaser.Physics.ARCADE;
    nyanmy.createMultiple(5, 'nyancat2');
    nyanmy.setAll('anchor.x', 0.5);
    nyanmy.setAll('anchor.y', 0.5);
    nyanmy.setAll('scale.x', 1.0);
    nyanmy.setAll('scale.y', 1.0);
    nyanmy.setAll('outOfBoundsKill', true);
    // adds an emitter trail to each cat
    nyanmy.forEach(function (enemy) {
      addEnemyEmitterTrail(enemy);
      enemy.events.onKilled.add(function () {
        enemy.trail.kill();
      })
    });


    //launchNyan();


    text = game.add.text(0, 0, "" + shotCount + " Litres of water used", {
      font: "35px Arial",
      //fill: "#ff0044",
      align: "center"
    });
    text2 = game.add.text(0, 50, 'Dry patches hit ' + goodShot, {
      font: "20px Arial",
      //fill: "#ff0044",
      align: "center"
    });
    sprayButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    endButton = game.input.keyboard.addKey(Phaser.Keyboard.M);

    // grumpy cat creating 
    gcat = game.add.group();
    gcat.enableBody = true;
    gcat.physicsBodyType = Phaser.Physics.ARCADE;
    gcat.createMultiple(5, 'gcat');
    gcat.setAll('anchor.x', 0.5);
    gcat.setAll('anchor.y', 0.5);
    gcat.setAll('scale.x', 1.0);
    gcat.setAll('scale.y', 1.0);
    gcat.setAll('outOfBoundsKill', true);
    gcat.setAll('checkWorldBounds', true);
    launchCat();

    // animation for the grumpy catt
    slashes = game.add.group();
    slashes.enableBody = true;
    slashes.physicsBodyType = Phaser.Physics.ARCADE;
    slashes.createMultiple(30, 'slash');
    slashes.setAll('anchor.x', 0.5);
    slashes.setAll('anchor.y', 0.5);
    slashes.forEach(function (slash) {
      slash.animations.add('slash');
    })

  },

  update: function () {
    text.setText("" + shotCount + " Litres used")
    text2.setText("Dry patches hit " + goodShot)
    game.input.scale;




    // makes the background move

    soil.tilePosition.y += 2;
    
    
    player.body.velocity.setTo(0, 0);
    if (game.input.pointer1.isDown) {
      xpos = game.input.pointer1.x;
      ypos = game.input.pointer1.y;
    }
    if (game.input.pointer2.isDown) {
      xpos1 = game.input.pointer2.x;
      ypos1 = game.input.pointer2.y;
    }
    if (ypos1 > window.innerHeight * 7 / 8 || ypos > window.innerHeight * 7 / 8) {
      actionOnClick();
      ypos1 = 0;
      ypos = 0;
    }

    // if the cursor press is right of the player then move right and accelerates more the further the press is 
    if (xpos > player.x && ypos < 685) {
      player.body.velocity.x = 1.5 * (xpos - player.x);
      if (xpos - player.x < 200) {
        player.body.velocity.x = 300;
      }

      // if the cursor press is left of the player then move right and accelerates more the further the press is 
    }
    if (xpos < player.x && ypos < 685) {
      player.body.velocity.x = 1.5 * (xpos - player.x);
      if (player.x - xpos < 200) {
        player.body.velocity.x = -300;
      }

    }
    if (xpos <= player.x + 5 && xpos >= player.x - 5) {
      player.body.velocity.x = 0;
    }




    // COllISSION TYPES
    game.physics.arcade.overlap(grassPatch, water, hitGrass, null, this);
    game.physics.arcade.overlap(bgrassPatch, water, hitEnemy, null, this);
    game.physics.arcade.overlap(grassPatch, waterR, hitGrass, null, this);
    game.physics.arcade.overlap(bgrassPatch, waterR, hitEnemy, null, this);
    game.physics.arcade.overlap(dog, water, hitDog, null, this);
    game.physics.arcade.overlap(gcat, water, hitCat, null, this);
    game.physics.arcade.overlap(nyanmy, water, hitNyan, null, this);
    game.physics.arcade.overlap(nyanmy, waterR, hitNyan, null, this);

    if (total >= 45 || endButton.isDown) {
      game.state.start('win');

    }

    if (cursors.left.isDown) {
      player.body.velocity.x = -300;
    } else if (cursors.right.isDown) {
      player.body.velocity.x = 300;
    }
    if (player.x > game.width - 25) {
      player.x = game.width - 25;
      player.body.acceleration.x = 0;
    }
    if (player.x < 25) {
      player.x = 25;
      player.body.acceleration.x = 0;
    }
    if (sprayButton.isDown) {
      spray();
    }
    hoseTrail.x = player.x;
  },


  render: function () {
    game.debug.text("time:" + (45 - total), 400, 63);
  }
}


game.state.add('boot', bootState);
game.state.add('menu', menuState);
game.state.add("play", playState);
game.state.add('win', winState);

game.state.start('boot');


/*
END OF GAME STATES

*/
/*

CONTROLS GAME MODE RIGHT HERE
******************************************************
******************************************************
******************************************************
******************************************************
******************************************************
******************************************************

*/

// the function to shoot a projectile
function spray() {
  if (total > 5 && shotCount == 0) {
    gamemode = 1;
  }
  if (gamemode == 1) {
    launchNyan();
  }
  sprayDelay = 250;
  if (game.time.now > sprayTimer) {
    if (gamemode == 2) {
      var bullet = waterR.getFirstExists(false);
    } else {
      var bullet = water.getFirstExists(false);
    }


    if (bullet) {
      bullet.reset(player.x, player.y + 8);
      bullet.body.velocity.y = -400;
      sprayTimer = game.time.now + sprayDelay;
      shotCount++;
      boop.play();
      modeChange();

    }
  }

}


//shooting on mobile device 
function actionOnClick() {

  if (total > 5 && shotCount == 0) {
    gamemode = 1;
  }
  sprayDelay = 250;
  if (gamemode == 1) {
    launchNyan();
  }
  if (game.time.now > sprayTimer) {
    if (gamemode == 2) {
      var bullet = waterR.getFirstExists(false);
    } else {
      var bullet = water.getFirstExists(false);
    }


    if (bullet) {
      bullet.reset(player.x, player.y + 8);
      bullet.body.velocity.y = -400;
      sprayTimer = game.time.now + sprayDelay;
      shotCount++;
      boop.play();
      modeChange();
    }
  }
}

// launches a grass patch 
function launchGrassPatch() {
  var MIN_ENEMY_SPACING = 600;
  var MAX_ENEMY_SPACING = 3000;
  var ENEMY_SPEED = 200;
  var enemy = grassPatch.getFirstExists(false);
  if (enemy) {
    enemy.reset(game.rnd.integerInRange(0, game.width), -20);
    enemy.body.velocity.y = ENEMY_SPEED;
    enemy.body.velocity.x = game.rnd.integerInRange(-100, 100);
  }
  game.time.events.add(game.rnd.integerInRange(MIN_ENEMY_SPACING, MAX_ENEMY_SPACING), launchGrassPatch);
}

function launchbGrassPatch() {
  brownGrassCount++;
  console.log(brownGrassCount);
  var MIN_ENEMY_SPACING = 1500;
  var MAX_ENEMY_SPACING = 1500;
  var ENEMY_SPEED = 150;
  var enemy = bgrassPatch.getFirstExists(false);
  //console.log(enemy);
  if (enemy) {
    enemy.reset(game.rnd.integerInRange(20, game.width - 20), -20);
    enemy.body.velocity.y = ENEMY_SPEED;

  }
  if (total < 40) {
    game.time.events.add(game.rnd.integerInRange(MIN_ENEMY_SPACING, MAX_ENEMY_SPACING), launchbGrassPatch);
  }
}

function launchDog() {
  if (gamemode == 0) {
    var MIN_ENEMY_SPACING = 1200;
    var MAX_ENEMY_SPACING = 3000;
    var ENEMY_SPEED = 340;
    var enemy = dog.getFirstExists(false);

    if (enemy) {
      enemy.reset(game.rnd.integerInRange(0, game.width), -20);
      enemy.body.velocity.y = ENEMY_SPEED;

      enemy.body.velocity.x = game.rnd.integerInRange(-200, 200);

    }
    game.time.events.add(game.rnd.integerInRange(MIN_ENEMY_SPACING, MAX_ENEMY_SPACING), launchDog);
  }
}




// what happens when you hit a grass patch
function hitGrass(enemy, bullet) {
  sprayTrail = game.add.emitter(bullet.x, bullet.y + 20, 10);
  if (gamemode == 2) {
    sprayTrail.makeParticles('waterR');
  } else {
    sprayTrail.makeParticles('water');
  }
  sprayTrail.setXSpeed(100);
  sprayTrail.setYSpeed(200, 180);
  sprayTrail.setRotation(50, -50);
  sprayTrail.start(false, 600, 2, 40);
  enemy.kill();
  bullet.kill();
  splash.play();
}

function hitEnemy(enemy, bullet) {
  enemy.kill();
  bullet.kill();
  goodShot++;
  splash.play();
}

function hitDog(enemy, bullet) {
  bullet.kill();
  enemy.body.velocity.x = 0;
  drink.play();
}

function hitNyan(enemy, bullet) {
  bullet.kill();
}


function launchCat() {
  if (gamemode == 0) {
    var MIN_ENEMY_SPACING = 1200;
    var MAX_ENEMY_SPACING = 3000;
    var ENEMY_SPEED = 200;

    var enemy = gcat.getFirstExists(false);
    if (enemy) {
      enemy.reset(game.rnd.integerInRange(0, game.width), -20);
      enemy.body.velocity.y = ENEMY_SPEED;
      enemy.body.velocity.x = game.rnd.integerInRange(-200, 200);
    }
    game.time.events.add(game.rnd.integerInRange(MIN_ENEMY_SPACING, MAX_ENEMY_SPACING), launchCat);
  }
}


function hitCat(enemy, bullet) {
  meow.play();
  var slash = slashes.getFirstExists(false);

  slash.reset(game.width * 0.5, game.height * 0.5);
  slash.alpha = 0.7;
  slash.play('slash', 5, false, true);
  enemy.kill();
  bullet.kill();



}
//switches into easter egg mode
function modeChange() {

  if (gamemode == 1) {
    bgm.destroy();
    nyansong.loopFull();
    //player.kill();
    catplayer.alpha = 1;
    starfield.alpha = 1;
    player = catplayer;
    game.physics.enable(player, Phaser.Physics.ARCADE);
    //hose.setAlpha = 0;
    hose.destroy();
    hoseTrail.destroy();

    hoseTrail = game.add.emitter(player.x, player.y + 50, 400);
    hoseTrail.makeParticles('nyancattrail');
    hoseTrail.setXSpeed(0);
    hoseTrail.setYSpeed(200, 180);
    hoseTrail.setRotation(50, -50);
    hoseTrail.setAlpha(0.4, 0, 400);
    hoseTrail.start(false, 5000, 10);
    water.createMultiple(30, 'waterR');

    gamemode++;

  }
}

// adds an enemy emitter trail 
function addEnemyEmitterTrail(enemy) {
  var nctrail = game.add.emitter(enemy.x - 500, enemy.y, 50);
  //hoseTrail.makeParticles('trail');
  nctrail.makeParticles('nyancattrail2');
  nctrail.setXSpeed(-200);
  nctrail.setYSpeed(-10, 10);
  nctrail.setRotation(-10, 10);
  nctrail.setAlpha(0.4, 0, 400);
  enemy.trail = nctrail;
}


function launchNyan() {
  var MIN_ENEMY_SPACING = 600;
  var MAX_ENEMY_SPACING = 3000;
  var ENEMY_SPEED = 340;
  var enemy = nyanmy.getFirstExists(false);

  if (enemy) {
    enemy.reset(-20, game.rnd.integerInRange(0, game.height - 100));
    //enemy.body.velocity.y = ENEMY_SPEED;
    enemy.body.velocity.x = 400;

    enemy.trail.start(false, 200, 3);
    enemy.update = function () {
      enemy.trail.x = enemy.x - 50;
      enemy.trail.y = enemy.y;
      if (enemy.x > game.width + 400) {
        enemy.trail.kill()
      }
      if (enemy.x > game.width + 200) {
        enemy.kill();
      }
    }
  }
  game.time.events.add(game.rnd.integerInRange(MIN_ENEMY_SPACING, MAX_ENEMY_SPACING), launchNyan);
}

function updateCounter() {
  total++;

}
// calculates the score 
function calcScore() {

  score = goodShot * 4 - shotCount;
  if (score < 0) {
    score = 0;

  }
  score = score * accuracy / 100;
  score = Math.round(score);
  // perfect score is a 84
}

// the get cookie function to get username. 
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// resizes the canvas to the proper size
function resize() {
  var canvas = game.canvas,
    width = window.innerWidth,
    height = window.innerHeight;
  var wratio = width / height,
    ratio = canvas.width / canvas.height;

  if (wratio < ratio) {
    canvas.style.width = width + "px";
    canvas.style.height = (width / ratio) + "px";
  } else {
    canvas.style.width = (height * ratio) + "px";
    canvas.style.height = height + "px";
  }
}

// makes a cookie 
function makeCookie3(name, content) {

  var d = new Date();
  d.setTime(d.getTime() + (5 * 24 * 60 * 60 * 1000));

  var expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + content + ";" + expires + ";path=/";
}


// gets a parameter value from the cookie
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return false;
}