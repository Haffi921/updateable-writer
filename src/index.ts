import { stdout } from "node:process";

import { ANSI, ANSI_CURSOR_MOVE } from "./ansiTerminalCommands.js";
import { hideCursor } from "./hideCursor.js";

interface Line {
  readonly id: number;
  text: string;
  update(text: string): void;
}

export const { writeLine } = (function () {
  const lines: Line[] = [];

  hideCursor();

  console.log = (...data: any[]) => {
    const lines = data.join("").split("\n");
    for (const line of lines) {
      writeLine(line);
    }
  };

  function writeLine(text: Line["text"]): Line {
    const id = getNextId();
    const newLine: Line = {
      id,
      text: sanitizeText(text),
      update: createLineUpdater(id),
    };
    lines.push(newLine);
    write(newLine.text);
    return newLine;
  }

  function write(text: Line["text"], index: number = lines.length) {
    stdout.write(ANSI_CURSOR_MOVE.UP(lines.length - index));
    stdout.write(ANSI.ERASELINE);
    stdout.write(text);
    stdout.write(ANSI_CURSOR_MOVE.DOWN(lines.length - index - 1));
  }

  function sanitizeText(text: Line["text"]): Line["text"] {
    return text.split("\n")[0].concat("\n");
  }

  function updateLine(id: Line["id"], text: Line["text"]): void {
    const lineIdx = lines.findIndex((line) => line.id === id);
    if (lineIdx === -1) return;

    const line = lines[lineIdx];
    line.text = sanitizeText(text);
    write(line.text, lineIdx);
  }

  function createLineUpdater(id: Line["id"]) {
    return updateLine.bind(null, id);
  }

  function getNextId() {
    return lines.length;
  }

  return { writeLine };
})();
