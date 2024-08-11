const ANSI_ESCAPE = "\u001b" as const;

export const ANSI = {
  CURSOR: {
    HIDE: `${ANSI_ESCAPE}[?25l`,
    SHOW: `${ANSI_ESCAPE}[?25h`,
    UP: (lines = 1) => (lines > 0 ? `${ANSI_ESCAPE}[${lines}A` : ""),
    DOWN: (lines = 1) => (lines > 0 ? `${ANSI_ESCAPE}[${lines}B` : ""),
  } as const,
  ERASELINE: `${ANSI_ESCAPE}[2K`,
} as const;
