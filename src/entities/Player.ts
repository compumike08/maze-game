import { ScoreText } from "../hud/ScoreText";
import { LivesText } from "../hud/LivesText";
import { BaseScene } from "../scenes/BaseScene";

const ACCELERATION_AMOUNT = 2;
const FINE_ACCELERATION_AMOUNT = 0.5;
const START_NUM_OF_LIVES = 20;

export class Player extends Phaser.Physics.Arcade.Sprite {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  scoreText: ScoreText;
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
      this.scoreText = new ScoreText(scene, initOpts.score);
      this.livesText = new LivesText(scene, initOpts.lives);
    } else {
      this.scoreText = new ScoreText(scene, 0);
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
    const { left, right, up, down, shift } = this.cursors;

    if (this.body === null || this.body === undefined) {
      return;
    }

    if (left.isDown && shift.isDown) {
      this.setVelocityX(this.body.velocity.x - FINE_ACCELERATION_AMOUNT);
    } else if (left.isDown) {
      this.setVelocityX(this.body.velocity.x - ACCELERATION_AMOUNT);
    }

    if (right.isDown && shift.isDown) {
      this.setVelocityX(this.body.velocity.x + FINE_ACCELERATION_AMOUNT);
    } else if (right.isDown) {
      this.setVelocityX(this.body.velocity.x + ACCELERATION_AMOUNT);
    }

    if (up.isDown && shift.isDown) {
      this.setVelocityY(this.body.velocity.y - FINE_ACCELERATION_AMOUNT);
    } else if (up.isDown) {
      this.setVelocityY(this.body.velocity.y - ACCELERATION_AMOUNT);
    }

    if (down.isDown && shift.isDown) {
      this.setVelocityY(this.body.velocity.y + FINE_ACCELERATION_AMOUNT);
    } else if (down.isDown) {
      this.setVelocityY(this.body.velocity.y + ACCELERATION_AMOUNT);
    }
  }

  decreaseLives() {
    this.livesText.decrease(1);
    if (this.livesText.lives < 0) {
      this.die();
    }
  }

  increaseScore() {
    this.scoreText.increaseScore(1);
  }

  die() {
    this.gameOverCallback();
  }
}
