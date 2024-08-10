import { stdout } from "node:process";

import { cursorDown, cursorUp, eraseLine } from "ansi-escapes";

import { cursorHide } from "./hideCursor.js";
import { stdinDisable } from "./stdinDisable.js";

interface Line {
  readonly id: number;
  text: string;
  update(text: string): void;
}

export class UpdateableWriter {
  private lines: Line[] = [];
  private get length() {
    return this.lines.length;
  }

  constructor() {
    stdinDisable();
    cursorHide();
  }

  writeLine(text: Line["text"]): Line {
    const id = this.getNextId();
    const newLine: Line = {
      id,
      text: this.sanitizeText(text),
      update: this.createLineUpdater(id),
    };
    this.lines.push(newLine);
    stdout.write(newLine.text);
    return newLine;
  }

  private sanitizeText(text: Line["text"]): Line["text"] {
    return text.split("\n")[0].concat("\n");
  }

  private updateLine(id: Line["id"], text: Line["text"]): void {
    const lineIdx = this.lines.findIndex((line) => line.id === id);
    if (lineIdx === -1) return;

    const line = this.lines[lineIdx];
    line.text = this.sanitizeText(text);

    stdout.write(cursorUp(this.length - lineIdx));
    stdout.write(eraseLine);
    stdout.write(line.text);
    stdout.write(cursorDown(this.length - lineIdx - 1));
  }

  private createLineUpdater(id: Line["id"]) {
    return this.updateLine.bind(this, id);
  }

  private getNextId() {
    return this.length;
  }
}
