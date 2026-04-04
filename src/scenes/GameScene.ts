import { Player } from "../entities/Player";
import { BaseScene } from "./BaseScene";

export class GameScene extends BaseScene {
  player: Player | undefined;

  constructor() {
    super("GameScene");
  }

  create() {
    this.createPlayer();
  }

  createPlayer() {
    this.player = new Player(this, 50, 50);
  }
}
