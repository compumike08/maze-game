/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 */

import { AUTO, Game } from "phaser";
import { GAME_HEIGHT, GAME_WIDTH } from "./globalConstants";
import { Preloader } from "./scenes/Preloader";
import { MainMenu } from "./scenes/MainMenu";
import { GameScene } from "./scenes/GameScene";
import { GameOver } from "./scenes/GameOver";

import "./index.css";

const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  parent: "game-container",
  backgroundColor: "#000000",
  physics: {
    default: "arcade"
  },
  pixelArt: true,
  scene: [Preloader, MainMenu, GameScene, GameOver]
};

const StartGame = (parent: string) => {
  return new Game({ ...config, parent });
};

document.addEventListener("DOMContentLoaded", () => {
  StartGame("game-container");
});

export default StartGame;
