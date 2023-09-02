var hitTimer = 0; // Timer to control the hit effect duration
var hitDuration = 2000;
var closestMeteor;
var secondClosestMeteor;
var thirdClosestMeteor;
function update() {
  moveCloud();
  listenDuckMovement(this);
  handleDuckDamageEffect(this);
  find3ClosestMeteor();
  drawLine3ClosestMeteor(this);
}
function moveCloud() {
  cloud1.play("cloud1-idle", true);
  cloud2.play("cloud2-idle", true);
  cloud1.x += 0.25;
  cloud2.x += 0.25;

  // Reset the cloud's position to the left when it goes off-screen
  if (cloud1.x > game.config.width) {
    cloud1.x = -cloud1.width;
  }
  if (cloud2.x > game.config.width) {
    cloud2.x = -cloud2.width;
  }
}
function listenDuckMovement(scene) {
  const cursors = scene.input.keyboard.createCursorKeys();
  if (cursors.left.isDown) {
    duck.setVelocityX(-DUCK_SPEED);

    duck.anims.play("left", true);
  } else if (cursors.right.isDown) {
    duck.setVelocityX(DUCK_SPEED);

    duck.anims.play("right", true);
  } else {
    duck.setVelocityX(0);

    duck.anims.play("turn");
  }

  if (cursors.up.isDown && duck.body.touching.down) {
    duck.setVelocityY(-330);
  }
}
function handleDuckDamageEffect(scene) {
  if (hitTimer > 0) {
    // Flash the player by altering visibility
    if (hitTimer % 100 == 0) {
      duck.visible = !duck.visible;
    }

    // Decrease the hit timer
    hitTimer -= 10;
  } else {
    // Reset the player's visibility when the hit effect duration is over
    duck.visible = true;
  }
}

function resetGame() {
  updateScore(0);
  duck.setX(200);
  duck.setY(450);
  meteorGroup.children.iterate(function (child) {
    if (child) child.destroy();
  });
}

function find3ClosestMeteor() {
  meteorGroup.children.entries.sort(
    (a, b) =>
      euclideanDistance([a.x, a.y], [duck.x, duck.y]) -
      euclideanDistance([b.x, b.y], [duck.x, duck.y])
  );
  closestMeteor = meteorGroup.children.entries[0];
  secondClosestMeteor = meteorGroup.children.entries[1];
  thirdClosestMeteor = meteorGroup.children.entries[2];
}
function drawLine3ClosestMeteor(scene) {
  if (closestMeteor) {
    closestMeteorLine.clear();
    const line = new Phaser.Geom.Line(
      duck.x,
      duck.y,
      closestMeteor.x,
      closestMeteor.y
    );
    closestMeteorLine.strokeLineShape(line);
  }
  if (secondClosestMeteor) {
    secondClosestMeteorLine.clear();
    const line = new Phaser.Geom.Line(
      duck.x,
      duck.y,
      secondClosestMeteor.x,
      secondClosestMeteor.y
    );
    secondClosestMeteorLine.strokeLineShape(line);
  }
  if (thirdClosestMeteor) {
    thirdClosestMeteorLine.clear();
    const line = new Phaser.Geom.Line(
      duck.x,
      duck.y,
      thirdClosestMeteor.x,
      thirdClosestMeteor.y
    );
    thirdClosestMeteorLine.strokeLineShape(line);
  }
}
function euclideanDistance(point1, point2) {
  if (point1.length !== point2.length) {
    throw new Error("Point dimensions do not match");
  }

  let sum = 0;
  for (let i = 0; i < point1.length; i++) {
    sum += Math.pow(point1[i] - point2[i], 2);
  }

  return Math.sqrt(sum);
}

function updateScore(newScore) {
  score = newScore;
  scoreText.setText("Score " + newScore);
}
