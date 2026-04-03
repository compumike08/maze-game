interface Menu {
  text: string;
  scene?: string;
  textGO?: Phaser.GameObjects.Text;
}

interface FontConfig {
  fontSize: number;
  lineHeight: number;
  fontOptions: {
    fontSize: string;
    fill: string;
  };
}
