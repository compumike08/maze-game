import { BaseScene } from "../scenes/BaseScene";

export class LivesText {
  x: number;
  y: number;
  lives: number;
  livesText: Phaser.GameObjects.Text;

  constructor(scene: BaseScene, lives: number) {
    this.x = scene.gameWidth - 160;
    this.y = 15;
    this.lives = lives;

    this.livesText = scene.add.text(this.x, this.y, `Lives: ${this.lives}`, {
      fontFamily: "Arial Black",
      fontSize: 22,
      color: "#ffffff",
      stroke: "#000000",
      strokeThickness: 3,
      align: "center"
    });
    this.livesText.setOrigin(0).setDepth(5);
  }

  decrease(amount: number) {
    if (amount <= 0) {
      this.lives = 0;
    } else {
      this.lives = this.lives - amount;
    }

    this.livesText.setText(`Lives: ${this.lives}`);
  }
}
