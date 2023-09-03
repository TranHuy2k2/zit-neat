var hitTimer = 0; // Timer to control the hit effect duration
var hitDuration = 2000;
var closestMeteor;
var secondClosestMeteor;
var thirdClosestMeteor;
function update() {
  if (!population.done()) population.updateAlive();
  else population.naturalSelection();
  moveCloud();
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

function resetGame(duck) {
  population.population.map((candidate) => {
    if (candidate.duck == duck) {
      candidate.dead = true;
      candidate.duck.setX(200);
      candidate.duck.setY(450);
      candidate.score = 0;
      duck.destroy();
      console.log(candidate);
    }
  });

  meteorGroup.children.iterate(function (child) {
    if (child) child.destroy();
  });
}

function find3ClosestMeteor() {
  population.population.map((candidate) => {
    const duck = candidate.duck;
    meteorGroup.children.entries.sort(
      (a, b) =>
        euclideanDistance([a.x, a.y], [duck.x, duck.y]) -
        euclideanDistance([b.x, b.y], [duck.x, duck.y])
    );
    const closestMeteor = meteorGroup.children.entries[0];
    const secondClosestMeteor = meteorGroup.children.entries[1];
    const thirdClosestMeteor = meteorGroup.children.entries[2];
    candidate.closestMeteor = closestMeteor;
    candidate.secondClosestMeteor = secondClosestMeteor;
    candidate.thirdClosestMeteor = thirdClosestMeteor;
  });
}
function drawLine3ClosestMeteor(scene) {
  population.population.map((candidate) => {
    const duck = candidate.duck;
    if (candidate.closestMeteor) {
      candidate.closestMeteorLine.clear();
      const line = new Phaser.Geom.Line(
        duck.x,
        duck.y,
        candidate.closestMeteor.x,
        candidate.closestMeteor.y
      );
      candidate.closestMeteorLine.strokeLineShape(line);
    }
    if (candidate.secondClosestMeteor) {
      candidate.secondClosestMeteorLine.clear();
      const line = new Phaser.Geom.Line(
        duck.x,
        duck.y,
        candidate.secondClosestMeteor.x,
        candidate.secondClosestMeteor.y
      );
      candidate.secondClosestMeteorLine.strokeLineShape(line);
    }
    if (candidate.thirdClosestMeteor) {
      candidate.thirdClosestMeteorLine.clear();
      const line = new Phaser.Geom.Line(
        duck.x,
        duck.y,
        candidate.thirdClosestMeteor.x,
        candidate.thirdClosestMeteor.y
      );
      candidate.thirdClosestMeteorLine.strokeLineShape(line);
    }
  });
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
