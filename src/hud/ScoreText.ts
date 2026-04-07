import { BaseScene } from "../scenes/BaseScene";

export class ScoreText {
  x: number;
  y: number;
  score: number;
  scoreText: Phaser.GameObjects.Text;

  constructor(scene: BaseScene, score: number) {
    this.x = scene.gameWidth - 160;
    this.y = 45;
    this.score = score;

    this.scoreText = scene.add.text(this.x, this.y, `Score: ${this.score}`, {
      fontFamily: "Arial Black",
      fontSize: 22,
      color: "#ffffff",
      stroke: "#000000",
      strokeThickness: 3,
      align: "center"
    });
    this.scoreText.setOrigin(0).setDepth(5);
  }

  increaseScore(addToScore: number) {
    this.score = this.score + addToScore;
    this.scoreText.setText(`Score: ${this.score}`);
  }
}
