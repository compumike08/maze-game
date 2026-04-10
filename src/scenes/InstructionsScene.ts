import { BaseScene } from "./BaseScene";

export class InstructionsScene extends BaseScene {
  textContainer: Phaser.GameObjects.Container | undefined;

  constructor() {
    super("InstructionsScene");
  }

  create() {
    const headerConfigFontSize = 30;
    const headerTextFontConfig: FontConfig = {
      fontSize: headerConfigFontSize,
      lineHeight: 40,
      fontOptions: {
        fontSize: `${headerConfigFontSize}px`,
        fill: "#fff"
      }
    };

    const bodyConfigFontSize = 16;
    const bodyTextFontConfig: FontConfig = {
      fontSize: bodyConfigFontSize,
      lineHeight: 20,
      fontOptions: {
        fontSize: `${bodyConfigFontSize}px`,
        fill: "#fff"
      }
    };

    const headerText = this.add
      .text(0, 0, "Instructions/Controls", headerTextFontConfig)
      .setOrigin(0.5);

    const bodyLine1 = this.add
      .text(
        0,
        90,
        "- The object is to move the blue player dot through the maze and reach the\n  yellow end tile while avoiding the red wall tiles.\n- Use the arrow keys to add velocity to the player dot in that direction.\n- Each time you touch a red wall tile, you lose a life.\n- Your score increases by 1 each time you reach the end tile, and a new\n  maze is generated.\n- The game ends when you run out of lives, but you can also choose to quit early\n  by clicking the 'Quit' button in the bottom right corner during gameplay.",
        bodyTextFontConfig
      )
      .setOrigin(0.5);

    const backButton = this.add
      .text(0, 190, "Back", headerTextFontConfig)
      .setOrigin(0.5)
      .setInteractive();

    backButton.on("pointerover", () => {
      backButton.setStyle({
        fill: "#ff0"
      });
    });

    backButton.on("pointerout", () => {
      backButton.setStyle({
        fill: "#fff"
      });
    });

    backButton.on("pointerup", () => {
      this.scene.start("MainMenu");
    });

    this.textContainer = this.add.container(
      this.gameWidth / 2,
      this.gameHeight / 3,
      [headerText, bodyLine1, backButton]
    );
  }
}
