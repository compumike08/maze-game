import { LivesText } from "../hud/LivesText";
import { BaseScene } from "../scenes/BaseScene";

const ACCELERATION_AMOUNT = 2;
const START_NUM_OF_LIVES = 20;

export class Player extends Phaser.Physics.Arcade.Sprite {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  score: number;
  livesText: LivesText;
  gameOverCallback: () => void;

  constructor(
    scene: BaseScene,
    x: number,
    y: number,
    gameOverCallback: () => void,
    initOpts: PlayerInitOptions | null
  ) {
    super(scene, x, y, "player");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    if (initOpts) {
      this.score = initOpts.score;
      this.livesText = new LivesText(scene, initOpts.lives);
    } else {
      this.score = 0;
      this.livesText = new LivesText(scene, START_NUM_OF_LIVES);
    }

    this.gameOverCallback = gameOverCallback;

    this.init();

    this.cursors = (
      this.scene.input.keyboard as Phaser.Input.Keyboard.KeyboardPlugin
    ).createCursorKeys();

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  init() {
    this.setOrigin(0.5, 0.5)
      .setScale(0.5, 0.5)
      .setCollideWorldBounds(true)
      .setBounce(0.5);
  }

  update() {
    const { left, right, up, down } = this.cursors;

    if (this.body === null) {
      return;
    }

    if (left.isDown) {
      this.setVelocityX(this.body.velocity.x - ACCELERATION_AMOUNT);
    }

    if (right.isDown) {
      this.setVelocityX(this.body.velocity.x + ACCELERATION_AMOUNT);
    }

    if (up.isDown) {
      this.setVelocityY(this.body.velocity.y - ACCELERATION_AMOUNT);
    }

    if (down.isDown) {
      this.setVelocityY(this.body.velocity.y + ACCELERATION_AMOUNT);
    }
  }

  decreaseLives() {
    this.livesText.decrease(1);
    // TODO: Remove console.log
    console.log("Lives Left: " + this.livesText.lives);
    console.log("Score: " + this.score);
    if (this.livesText.lives < 0) {
      this.die();
    }
  }

  increaseScore() {
    this.score++;
    // TODO: Remove console.log
    console.log("Score (Increased): " + this.score);
  }

  die() {
    // TODO: Remove console.log
    console.log("DIE! --- Final Score: " + this.score);
    this.gameOverCallback();
  }
}
