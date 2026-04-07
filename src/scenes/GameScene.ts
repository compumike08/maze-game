import { generateMaze, Grid, MazeTile } from "dungeon-cartographer";
import { Player } from "../entities/Player";
import { BaseScene } from "./BaseScene";
import { Tile } from "../entities/Tile";
import { TILE_SIZE } from "../globalConstants";

export class GameScene extends BaseScene {
  player: Player | undefined;
  maze: Grid | undefined;
  tileGroup: Phaser.Physics.Arcade.Group | undefined;
  wallTileGroup: Phaser.Physics.Arcade.Group | undefined;
  startTile: Tile | undefined;
  endTile: Tile | undefined;

  constructor() {
    super("GameScene");
  }

  create() {
    this.createMaze();
    this.createPlayer();
    this.createCollider();
    this.createOverlapForFinish();
  }

  createMaze() {
    this.maze = generateMaze(10, { algorithm: "division" });
    this.tileGroup = this.physics.add.group();
    this.wallTileGroup = this.physics.add.group();

    for (let y = 0; y < this.maze[0].length; y++) {
      for (let x = 0; x < this.maze.length; x++) {
        const tileType: MazeTile = this.maze[x][y];
        const tile = new Tile(this, tileType, { xIndex: x, yIndex: y });

        if (tileType === MazeTile.START) {
          this.startTile = tile;
        } else if (tileType === MazeTile.END) {
          this.endTile = tile;
        } else if (tileType === MazeTile.WALL) {
          this.wallTileGroup?.add(tile);
        }

        this.tileGroup.add(tile);
      }
    }
  }

  createPlayer() {
    if (!this.startTile || !this.endTile) {
      throw new Error("Start or end tile not found in maze");
    }

    let xCoord = 0;
    let yCoord = 0;

    if (this.startTile.gridCoords.xIndex === 0) {
      xCoord = this.startTile.gridCoords.xIndex + TILE_SIZE / 2;
    } else {
      xCoord = this.startTile.gridCoords.xIndex * TILE_SIZE + TILE_SIZE / 2;
    }

    if (this.startTile.gridCoords.yIndex === 0) {
      yCoord = this.startTile.gridCoords.yIndex + TILE_SIZE / 2;
    } else {
      yCoord = this.startTile.gridCoords.yIndex * TILE_SIZE + TILE_SIZE / 2;
    }

    this.player = new Player(this, xCoord, yCoord);
  }

  createCollider() {
    if (!this.player || !this.tileGroup || !this.wallTileGroup) {
      throw new Error("Player or tile group not initialized");
    }

    this.physics.add.collider(this.player, this.wallTileGroup);
  }

  createOverlapForFinish() {
    if (!this.player || !this.endTile) {
      throw new Error("Player or end tile not initialized");
    }

    this.physics.add.overlap(
      this.player,
      this.endTile,
      () => {
        this.scene.start("MainMenu");
      },
      undefined,
      this
    );
  }
}
