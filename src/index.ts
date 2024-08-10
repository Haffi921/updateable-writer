import { UpdateableWriter } from "./updateableWriter.js";

const updateableWriter = new UpdateableWriter();

const line1 = updateableWriter.writeLine("Hello, Haffi");
const line2 = updateableWriter.writeLine("Does this work?");
const line3 = updateableWriter.writeLine("I hope so");

await new Promise((resolve) => setTimeout(resolve, 2000));
line1.update("Hello, world");

await new Promise((resolve) => setTimeout(resolve, 1000));
line2.update("It's working!");

await new Promise((resolve) => setTimeout(resolve, 1000));
const line4 = updateableWriter.writeLine("Yey!");

await new Promise((resolve) => setTimeout(resolve, 2000));
line3.update("This is fun");
