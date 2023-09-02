var cloud1;
var cloud2;
var duck;
var ground;
var meteorGroup;
var scoreText;
var score = 0;
var closestMeteorLine;
var secondClosestMeteorLine;
function create() {
  this.add.image(400, 300, "bg");
  scoreText = this.add.text(game.config.width - 200, 16, "score: 0", {
    fontSize: "32px",
    fill: "#000",
  });
  scoreText.setText("Score: " + score);
  createCloud(this);
  createDuck(this);
  createGround(this);
  createMeteorGroup(this);
  createFireEffect(this);
  create2ClosestMeteorLine(this);
}

function createCloud(scene) {
  cloud1 = scene.add.sprite(800, 100, "cloud1");
  cloud2 = scene.add.sprite(200, 200, "cloud1");
  scene.anims.create({
    key: "cloud1-idle",
    frames: scene.anims.generateFrameNumbers("cloud1", { start: 0, end: 1 }),
    frameRate: 2,
    repeat: -1,
  });
  scene.anims.create({
    key: "cloud2-idle",
    frames: scene.anims.generateFrameNumbers("cloud1", { start: 1, end: 0 }),
    frameRate: 2,
    repeat: -1,
  });
}
function createDuck(scene) {
  duck = scene.physics.add.sprite(100, 300, "duck");
  duck.setScale(0.65);
  duck.setCrop(10, 5, 140, 140);
  duck.setSize(20, 10);
  duck.setBounce(0.2);
  duck.setCollideWorldBounds(true);
  duck.setDepth(1);

  scene.anims.create({
    key: "left",
    frames: scene.anims.generateFrameNumbers("duck", { start: 0, end: 1 }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: "turn",
    frames: [{ key: "duck", frame: 2 }],
    frameRate: 20,
  });

  scene.anims.create({
    key: "right",
    frames: scene.anims.generateFrameNumbers("duck", { start: 3, end: 4 }),
    frameRate: 10,
    repeat: -1,
  });
}

function createGround(scene) {
  ground = scene.physics.add.staticGroup();
  ground.create(400, 700, "ground").setScale(1).refreshBody();
  ground.create(800, 700, "ground").setScale(1).refreshBody();
  scene.physics.add.collider(duck, ground);
}

function create2ClosestMeteorLine(scene) {
  closestMeteorLine = scene.add.graphics({
    lineStyle: { width: 4, color: 0xaa00aa },
  });
  secondClosestMeteorLine = scene.add.graphics({
    lineStyle: { width: 4, color: 0x00aa55 },
  });
}

function createMeteorGroup(scene) {
  meteorGroup = scene.physics.add.group();
  scene.time.addEvent({
    delay: Phaser.Math.Between(3000, 5000), // Random delay between 1 and 3 seconds
    callback: createMeteor,
    callbackScope: scene,
    loop: true,
  });
  scene.anims.create({
    key: "meteor_fall",
    frames: scene.anims.generateFrameNumbers("meteor", { start: 0, end: 2 }), // Adjust the frame range based on your sprite sheet
    frameRate: 10, // Adjust the frame rate as needed
    repeat: -1, // Repeat the animation indefinitely
  });
  scene.physics.add.overlap(
    meteorGroup,
    ground,
    (meteor, ground) => meteorHitGround(meteor, ground, scene),
    null,
    scene
  );
  scene.physics.add.overlap(
    meteorGroup,
    duck,
    (meteor, duck) => meteorHitDuck(duck, meteor, scene),
    null,
    scene
  );
}

function createFireEffect(scene) {
  scene.anims.create({
    key: "fire",
    frames: scene.anims.generateFrameNumbers("fire", { start: 0, end: 2 }), // Adjust the frame range based on your sprite sheet
    frameRate: 12, // Adjust the frame rate as needed
    repeat: -1, // Repeat the animation indefinitely
  });
}

function createMeteor() {
  for (let i = 0; i < METEOR_DIFFICULTY * 2; i++) {
    const meteor = meteorGroup
      .create(Phaser.Math.Between(0, game.config.width), -50, "meteor")
      .setScale(2.5);

    meteor.play("meteor_fall");

    meteor.setVelocity(0, Phaser.Math.Between(1, 20));
    meteor.setGravityY(Phaser.Math.Between(10, 50));
  }
  updateScore(score + 10);
}
