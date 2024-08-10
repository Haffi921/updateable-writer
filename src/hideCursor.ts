import process, { stdout } from "node:process";

import ansi from "ansi-escapes";

export const { hideCursor, showCursor } = (function () {
  let hidden = false;

  function hideCursor() {
    if (!hidden) {
      stdout.write(ansi.cursorHide);
      hidden = true;
      process.on("exit", showCursor);
    }
  }

  function showCursor() {
    if (hidden) {
      stdout.write(ansi.cursorShow);
      hidden = false;
      process.off("exit", showCursor);
    }
  }

  return { hideCursor, showCursor };
})();
