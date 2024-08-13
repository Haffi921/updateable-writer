import process, { stdout } from "node:process";
import { ANSI } from "./ansiTerminalCommands.js";

export const { hideCursor, showCursor } = (function () {
  let hidden = false;

  return {
    hideCursor() {
      if (!hidden) {
        stdout.write(ANSI.CURSOR.HIDE);
        hidden = true;
        process.on("exit", showCursor);
      }
    },
    showCursor() {
      if (hidden) {
        stdout.write(ANSI.CURSOR.SHOW);
        hidden = false;
        process.off("exit", showCursor);
      }
    },
  };
})();
