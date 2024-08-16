import { writeLine } from "updateable-writer";

const line1 = writeLine("Hello, Haffi");
const line2 = writeLine("Does this work?");
const line3 = writeLine("I hope so");

await new Promise((resolve) => setTimeout(resolve, 2000));
line1.update("Hello, world");

await new Promise((resolve) => setTimeout(resolve, 1000));
line2.update("It's working!");

console.log("Hello");

await new Promise((resolve) => setTimeout(resolve, 1000));
const line4 = writeLine("Yey!");

await new Promise((resolve) => setTimeout(resolve, 2000));
line3.update("This is fun");
