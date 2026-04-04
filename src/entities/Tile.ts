import { MazeTile } from "dungeon-cartographer";
import { BaseScene } from "../scenes/BaseScene";

export class Tile extends Phaser.Physics.Arcade.Sprite {
  tileType: MazeTile;
  gridCoords: GridCoords;

  constructor(scene: BaseScene, tileType: MazeTile, gridCoords: GridCoords) {
    const x = gridCoords.xIndex * 75;
    const y = gridCoords.yIndex * 75;

    if (tileType === MazeTile.WALL) {
      super(scene, x, y, "wallTile");
    } else if (tileType === MazeTile.PASSAGE || tileType === MazeTile.START) {
      super(scene, x, y, "floorTile");
    } else if (tileType === MazeTile.END) {
      super(scene, x, y, "endTile");
    } else {
      throw new Error(`Unsupported tile type: ${tileType}`);
    }

    this.tileType = tileType;
    this.gridCoords = gridCoords;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
  }

  init() {
    this.setOrigin(0, 0);

    if (this.tileType === MazeTile.WALL) {
      this.setImmovable(true).setPushable(false);
    }
  }
}
