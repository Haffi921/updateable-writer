export const enum ANSI {
  ESCAPE = "\u001b",
  ERASELINE = `${ANSI.ESCAPE}[2K`,
}

export const enum ANSI_CURSOR_VISIBILITY {
  HIDDEN = `${ANSI.ESCAPE}[?25l`,
  VISIBLE = `${ANSI.ESCAPE}[?25h`,
}

export const ANSI_CURSOR_MOVE = {
  UP: (lines = 1) => (lines > 0 ? `${ANSI.ESCAPE}[${lines}A` : ""),
  DOWN: (lines = 1) => (lines > 0 ? `${ANSI.ESCAPE}[${lines}B` : ""),
} as const;
