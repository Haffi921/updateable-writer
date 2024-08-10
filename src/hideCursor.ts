import process, { stdout } from "node:process";

import ansi from "ansi-escapes";

export const { cursorHide, cursorShow } = (function () {
  let hidden = false;

  function cursorHide() {
    if (!hidden) {
      stdout.write(ansi.cursorHide);
      hidden = true;
      process.on("exit", cursorShow);
    }
  }

  function cursorShow() {
    if (hidden) {
      stdout.write(ansi.cursorShow);
      hidden = false;
      process.off("exit", cursorShow);
    }
  }

  return { cursorHide, cursorShow };
})();
