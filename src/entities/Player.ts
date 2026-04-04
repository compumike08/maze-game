import { BaseScene } from "../scenes/BaseScene";

const ACCELERATION_AMOUNT = 5;

export class Player extends Phaser.Physics.Arcade.Sprite {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, "player");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();

    this.cursors = (
      this.scene.input.keyboard as Phaser.Input.Keyboard.KeyboardPlugin
    ).createCursorKeys();

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  init() {
    this.setOrigin(0.5, 0.5).setScale(0.5, 0.5).setCollideWorldBounds(true);
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
}
