import { stdout } from "node:process";

import { ANSI } from "./ansiTerminalCommands.js";
import { hideCursor } from "./hideCursor.js";

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
    hideCursor();

    console.log = (...data: any[]) => {
      const lines = data.join("").split("\n");
      for (const line of lines) {
        this.writeLine(line);
      }
    };
  }

  handleStdin(data: Buffer) {
    this.writeLine(data.toString());
  }

  writeLine(text: Line["text"]): Line {
    const id = this.getNextId();
    const newLine: Line = {
      id,
      text: this.sanitizeText(text),
      update: this.createLineUpdater(id),
    };
    this.lines.push(newLine);
    this.write(newLine.text);
    return newLine;
  }

  private write(text: Line["text"], index: number = this.length) {
    stdout.write(ANSI.CURSOR.UP(this.length - index));
    stdout.write(ANSI.ERASELINE);
    stdout.write(text);
    stdout.write(ANSI.CURSOR.DOWN(this.length - index - 1));
  }

  private sanitizeText(text: Line["text"]): Line["text"] {
    return text.split("\n")[0].concat("\n");
  }

  private updateLine(id: Line["id"], text: Line["text"]): void {
    const lineIdx = this.lines.findIndex((line) => line.id === id);
    if (lineIdx === -1) return;

    const line = this.lines[lineIdx];
    line.text = this.sanitizeText(text);
    this.write(line.text, lineIdx);
  }

  private createLineUpdater(id: Line["id"]) {
    return this.updateLine.bind(this, id);
  }

  private getNextId() {
    return this.length;
  }
}
