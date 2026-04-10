import { BaseScene } from "../scenes/BaseScene";

export class QuitButton {
  x: number;
  y: number;
  quitButtonText: Phaser.GameObjects.Text;

  constructor(scene: BaseScene, handleQuitClicked: () => void) {
    this.x = scene.gameWidth - 30;
    this.y = scene.gameHeight - 20;

    this.quitButtonText = scene.add.text(this.x, this.y, "Quit", {
      fontFamily: "Arial Black",
      fontSize: 30,
      color: "#0060fb",
      align: "center"
    });
    this.quitButtonText.setOrigin(1, 1).setDepth(5).setInteractive();

    this.quitButtonText.on("pointerover", () => {
      this.quitButtonText.setStyle({
        fill: "#ff0"
      });
    });

    this.quitButtonText.on("pointerout", () => {
      this.quitButtonText.setStyle({
        fill: "#0060fb"
      });
    });

    this.quitButtonText.on("pointerup", () => {
      handleQuitClicked();
    });
  }
}
