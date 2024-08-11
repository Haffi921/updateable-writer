import process, { stdout } from "node:process";
import { ANSI } from "./ansiTerminalCommands.js";

export const { hideCursor, showCursor } = new (class {
  private hidden = false;

  hideCursor() {
    if (!this.hidden) {
      stdout.write(ANSI.CURSOR.HIDE);
      this.hidden = true;
      process.on("exit", this.showCursor);
    }
  }

  showCursor() {
    if (this.hidden) {
      stdout.write(ANSI.CURSOR.SHOW);
      this.hidden = false;
      process.off("exit", this.showCursor);
    }
  }
})();
