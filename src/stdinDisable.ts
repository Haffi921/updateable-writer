import process, { stdin } from "node:process";

const ASCII_EXT_CODE = 0x03;

export const { disableStdin, enableStdin } = (function () {
  let disabled = false;

  function handleData(data: Buffer) {
    if (data[0] === ASCII_EXT_CODE) {
      process.emit("SIGINT");
    }
  }

  function disableStdin() {
    if (!disabled) {
      // Stdin
      stdin.setRawMode(true);
      stdin.on("data", handleData);
      // stdin.pause();

      // Flag
      disabled = true;

      // Exit cleanup
      process.on("exit", enableStdin);
    }
  }

  function enableStdin() {
    if (disabled) {
      // Stdin
      // stdin.resume();
      stdin.off("data", handleData);
      stdin.setRawMode(false);

      // Flag
      disabled = false;

      // Exit cleanup
      process.off("exit", enableStdin);
    }
  }

  return { disableStdin, enableStdin };
})();
