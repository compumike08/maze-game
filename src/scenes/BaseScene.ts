import { Scene } from "phaser";

export class BaseScene extends Scene {
  constructor(key: string) {
    super(key);
  }

  get gameHeight() {
    return this.game.config.height as number;
  }

  get gameWidth() {
    return this.game.config.width as number;
  }

  createMenu(
    menu: Array<Menu>,
    setupMenuEvents: (menuItem: Menu) => void,
    fontConfig: FontConfig
  ) {
    let lastMenuPositionY = 0;

    menu.forEach((menuItem) => {
      const menuPosition = [
        this.gameWidth / 2,
        this.gameHeight / 2 + lastMenuPositionY
      ];
      menuItem.textGO = this.add
        .text(
          menuPosition[0],
          menuPosition[1],
          menuItem.text,
          fontConfig.fontOptions
        )
        .setOrigin(0.5, 1);
      lastMenuPositionY += fontConfig.lineHeight;
      setupMenuEvents(menuItem);
    });
  }
}
