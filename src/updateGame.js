var hitTimer = 0; // Timer to control the hit effect duration
var hitDuration = 2000;
function update() {
  moveCloud();
  listenDuckMovement(this);
  handleDuckDamageEffect(this);
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
    duck.setVelocityX(-300);

    duck.anims.play("left", true);
  } else if (cursors.right.isDown) {
    duck.setVelocityX(300);

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
  score = 0;
  duck.setX(200);
  duck.setY(450);
  meteorGroup.children.iterate(function (child) {
    if (child) child.destroy();
  });
}
