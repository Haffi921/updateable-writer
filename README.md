[![npm version](https://badge.fury.io/js/updateable-writer.svg)](https://badge.fury.io/js/updateable-writer)

# Updateable Writer

> Updateable Stream-Writer, made for writing lines to stdout and then updating lines with new information

Example:

```typescript
// Write a new line
const line = writeLine("Hello");
// Terminal:
// > Hello

// Write some other stuff
console.log("Copied files here");
const another_line = writeLine("More work here");
// Terminal:
// > Hello
// > Copied files here
// > More work here

// Update line
line.update("Hello, World!");
// Terminal:
// > Hello, World
// > Copied files here
// > More work here
```

## Table of contents

- [Updateable Writer](#updateable-writer)
  - [Table of contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Function: `writeLine`](#function-writeline)
    - [Class: `Line`](#class-line)
  - [Authors](#authors)
  - [License](#license)

## Installation

```sh
$ npm i updateable-writer
$ pnpm add updateable-writer
$ bun add updateable-writer
$ yarn add updateable-writer
```

## Usage

### Function: `writeLine`

Functions the similar to `console.log`. takes in `text: string` and returns a `Line` object.

> Note: A line termination character (`\n`) will be added to `text` if there is none before. Any text after a line termination character will not be printed.

### Class: `Line`

Interface with a function `update`, that will update the text in the terminal. Functions the same as `writeLine` as it receives a `text: string`.

## Authors

- [**Hafsteinn Ragnarsson**](https://github.com/Haffi921)

## License

MIT License © Hafsteinn Ragnarsson
