const { promisify } = require("util");
let { writeFile, readFile } = require("fs");
writeFile = promisify(writeFile);
readFile = promisify(readFile);
const { prompt } = require("inquirer");

const run = async () => {
  console.log("Input Manager Details...");
  const { name, id, email, officeID } = prompt([
    {
      type: "input",
      name: "name",
      message: "Name"
    },
    {
      type: "input",
      name: "id",
      message: "ID"
    },
    {
      type: "input",
      name: "email",
      message: "email",
      validate: input => /^.+@.+\..+$/gi.test(input)
    },
    {
      type: "input",
      name: "officeID",
      message: "Office Number",
      validate: input => /^.+@.+\..+$/gi.test(input)
    }
  ]);
};
