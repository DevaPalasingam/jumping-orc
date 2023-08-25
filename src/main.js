import kaboom from "kaboom";

const FLOOR_HEIGHT = 48;
const JUMP_FORCE = 800;
const SPEED = 480;

kaboom();
loadSprite("orc", "sprites/orc/walking/right_tile000.png");

scene("game", () => {
  setGravity(1600);
  const orc = add([sprite("orc"), pos(80, 40), area(), body()]);

  // floor
  add([
    rect(width(), FLOOR_HEIGHT),
    outline(4),
    pos(0, height()),
    anchor("botleft"),
    area(),
    body({ isStatic: true }),
    color(127, 200, 255),
  ]);

  function jump() {
    if (orc.isGrounded()) {
      orc.jump(JUMP_FORCE);
    }
  }
  // jump when user press space
  onKeyPress("space", jump);
  onClick(jump);

  function spawnTree() {
    // add tree obj
    add([
      rect(48, rand(32, 96)),
      area(),
      outline(4),
      pos(width(), height() - FLOOR_HEIGHT),
      anchor("botleft"),
      color(255, 180, 255),
      move(LEFT, SPEED),
      "tree",
    ]);

    // wait a random amount of time to spawn next tree
    wait(rand(0.5, 1.5), spawnTree);
  }

  spawnTree();

  orc.onCollide("tree", () => {
    addKaboom(orc.pos);
    shake();
  });

  // keep track of score
  let score = 0;

  const scoreLabel = add([text(score), pos(24, 24)]);

  // increment score every frame
  onUpdate(() => {
    score++;
    scoreLabel.text = score;
  });
});

go("game");
