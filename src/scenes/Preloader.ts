import { BaseScene } from "./BaseScene";
import PlayerImg from "../assets/maze-game-player.png";
import FloorImg from "../assets/maze-game-floor.png";
import WallImg from "../assets/maze-game-wall.png";
import EndImg from "../assets/maze-game-end.png";
import { FINAL_SCORE_KEY, STORE_PLAYER_KEY } from "../globalConstants";

export class Preloader extends BaseScene {
  constructor() {
    super("Preloader");
  }

  preload() {
    this.load.image("player", PlayerImg);
    this.load.image("floorTile", FloorImg);
    this.load.image("wallTile", WallImg);
    this.load.image("endTile", EndImg);
  }

  create() {
    // ensure local storage is cleaned up
    localStorage.removeItem(STORE_PLAYER_KEY);
    localStorage.removeItem(FINAL_SCORE_KEY);

    //  Move to the MainMenu.
    this.scene.start("MainMenu");
  }
}
