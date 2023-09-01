var cloud1;
var cloud2;
var duck;
var ground;
function create() {
  this.add.image(400, 300, "bg");
  createCloud(this);
  createGround(this);
  createDuck(this);
  this.physics.add.collider(duck, ground);
}

function createCloud(scene) {
  cloud1 = scene.add.image(800, 100, "cloud1");
  cloud2 = scene.add.image(200, 200, "cloud2");
}

function createDuck(scene) {
  duck = scene.physics.add.sprite(100, 300, "duck");
  duck.setScale(0.7);
  duck.setBounce(0.2);
  duck.setCollideWorldBounds(true);

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
}
