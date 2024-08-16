import process, { stdout } from "node:process";
import { ANSI, ANSI_CURSOR_VISIBILITY } from "./ansiTerminalCommands.js";

export const { hideCursor, showCursor } = (function () {
  let hidden = false;

  return {
    hideCursor() {
      if (!hidden) {
        stdout.write(ANSI_CURSOR_VISIBILITY.HIDDEN);
        hidden = true;
        process.on("exit", showCursor);
      }
    },
    showCursor() {
      if (hidden) {
        stdout.write(ANSI_CURSOR_VISIBILITY.VISIBLE);
        hidden = false;
        process.off("exit", showCursor);
      }
    },
  };
})();
