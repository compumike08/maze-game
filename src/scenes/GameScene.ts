import { generateMaze, Grid, MazeTile } from "dungeon-cartographer";
import { Player } from "../entities/Player";
import { BaseScene } from "./BaseScene";
import { Tile } from "../entities/Tile";
import {
  FINAL_SCORE_KEY,
  BEST_SCORE_KEY,
  TILE_SIZE,
  STORE_PLAYER_KEY
} from "../globalConstants";

export class GameScene extends BaseScene {
  player: Player | undefined;
  maze: Grid | undefined;
  tileGroup: Phaser.Physics.Arcade.Group | undefined;
  wallTileGroup: Phaser.Physics.Arcade.Group | undefined;
  startTile: Tile | undefined;
  endTile: Tile | undefined;
  finishOverlap: Phaser.Physics.Arcade.Collider | undefined;
  wallCollider: Phaser.Physics.Arcade.Collider | undefined;

  constructor() {
    super("GameScene");
  }

  create() {
    this.createMaze();
    this.createPlayer();
    this.createOverlapForWalls();
    this.createOverlapForFinish();
  }

  gameOverCallback() {
    if (!this.player || !this.wallCollider || !this.finishOverlap) {
      throw new Error(
        "gameOverCallback invoked while player, wallCollider, or finishOverlap was undefined"
      );
    }

    this.physics.world.removeCollider(this.wallCollider);
    this.physics.world.removeCollider(this.finishOverlap);

    if (this.player.livesText.lives < 0) {
      localStorage.setItem(FINAL_SCORE_KEY, this.player.score.toString());

      const bestScoreStr = localStorage.getItem(BEST_SCORE_KEY);
      if (bestScoreStr === null) {
        localStorage.setItem(BEST_SCORE_KEY, this.player.score.toString());
      } else {
        const bestScore = parseInt(bestScoreStr, 10);
        if (bestScore < this.player.score) {
          localStorage.setItem(BEST_SCORE_KEY, this.player.score.toString());
        }
      }

      this.scene.start("GameOver");
    } else {
      this.player.increaseScore();

      const playerInitOpts: PlayerInitOptions = {
        score: this.player.score,
        lives: this.player.livesText.lives
      };
      localStorage.setItem(STORE_PLAYER_KEY, JSON.stringify(playerInitOpts));

      this.scene.start("GameScene");
    }
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

    const storedPlayerStr = localStorage.getItem(STORE_PLAYER_KEY);
    if (storedPlayerStr) {
      const playerInitOpts: PlayerInitOptions = JSON.parse(storedPlayerStr);
      this.player = new Player(
        this,
        xCoord,
        yCoord,
        this.gameOverCallback.bind(this),
        playerInitOpts
      );
      localStorage.removeItem(STORE_PLAYER_KEY);
    } else {
      this.player = new Player(
        this,
        xCoord,
        yCoord,
        this.gameOverCallback.bind(this),
        null
      );
    }
  }

  createOverlapForWalls() {
    if (!this.player || !this.wallTileGroup) {
      throw new Error("Player or wall tile group not initialized");
    }

    this.wallCollider = this.physics.add.collider(
      this.player,
      this.wallTileGroup,
      () => {
        this.player?.decreaseLives();
      },
      undefined,
      this
    );
  }

  createOverlapForFinish() {
    if (!this.player || !this.endTile) {
      throw new Error("Player or end tile not initialized");
    }

    this.finishOverlap = this.physics.add.overlap(
      this.player,
      this.endTile,
      () => {
        this.gameOverCallback();
      },
      undefined,
      this
    );
  }
}
