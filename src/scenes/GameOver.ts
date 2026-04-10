import {
  BEST_SCORE_KEY,
  FINAL_SCORE_KEY,
  STORE_PLAYER_KEY
} from "../globalConstants";
import { BaseScene } from "./BaseScene";

export class GameOver extends BaseScene {
  textContainer: Phaser.GameObjects.Container | undefined;
  finalScore: number;
  bestScore: number;

  constructor() {
    super("GameOver");

    this.finalScore = -1;
    this.bestScore = -1;
  }

  init() {
    const bestScoreStr = localStorage.getItem(BEST_SCORE_KEY);
    if (bestScoreStr) {
      this.bestScore = parseInt(bestScoreStr, 10);
    }

    const finalScoreStr = localStorage.getItem(FINAL_SCORE_KEY);
    if (!finalScoreStr) {
      throw new Error(
        "Value for FINAL_SCORE_KEY missing from localStorage on GameOver scene"
      );
    }
    this.finalScore = parseInt(finalScoreStr, 10);

    // clean up local storage
    localStorage.removeItem(FINAL_SCORE_KEY);
    localStorage.removeItem(STORE_PLAYER_KEY);
  }

  create() {
    const gameOverText = this.add.text(0, 0, "Game Over", {
      fontFamily: "Arial Black",
      fontSize: 50,
      color: "#ffffff",
      stroke: "#000000",
      strokeThickness: 8,
      align: "center"
    });
    gameOverText.setOrigin(0.5);

    const endingScoreText = this.add.text(
      0,
      42,
      `Final Score: ${this.finalScore < 0 ? "error" : this.finalScore}`,
      {
        fontFamily: "Arial Black",
        fontSize: 35,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 5,
        align: "center"
      }
    );
    endingScoreText.setOrigin(0.5);

    const bestScoreText = this.add.text(
      0,
      84,
      `Previous Best Score: ${this.bestScore === -1 ? "none" : this.bestScore}`,
      {
        fontFamily: "Arial Black",
        fontSize: 35,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 5,
        align: "center"
      }
    );
    bestScoreText.setOrigin(0.5);

    const continueText = this.add.text(0, 150, "Click to return to Main Menu", {
      fontFamily: "Arial Black",
      fontSize: 25,
      color: "#ffffff",
      stroke: "#000000",
      strokeThickness: 5,
      align: "center"
    });
    continueText.setOrigin(0.5).setInteractive();

    continueText.on("pointerover", () => {
      continueText.setStyle({
        fill: "#ff0"
      });
    });

    continueText.on("pointerout", () => {
      continueText.setStyle({
        fill: "#ffffff"
      });
    });

    this.textContainer = this.add.container(
      this.gameWidth / 2,
      this.gameHeight / 2 - 40,
      [gameOverText, endingScoreText, bestScoreText, continueText]
    );

    this.input.once("pointerup", () => {
      this.scene.start("MainMenu");
    });
  }
}
