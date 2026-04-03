import { BaseScene } from "./BaseScene";
import PlayerImg from "../assets/maze-game-player.png";
import FloorImg from "../assets/maze-game-floor.png";
import WallImg from "../assets/maze-game-wall.png";

export class Preloader extends BaseScene {
  constructor() {
    super("Preloader");
  }

  preload() {
    this.load.image("player", PlayerImg);
    this.load.image("floorTile", FloorImg);
    this.load.image("wallTile", WallImg);
  }

  create() {
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.

    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    this.scene.start("MainMenu");
  }
}
