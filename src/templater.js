const fs = require("fs");
const { promisify } = require("util");
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

/** @returns The root HTML template as a string. */
const template = async () => {
  return await readFile("./src/templates/template.html", "UTF-8");
};

/** @returns The card HTML template as a string. */
const cardTemplate = async () => {
  return await readFile("./src/templates/card.html", "UTF-8");
};

/** @returns The CSS as a string  */
const styleTemplate = async () => {
  return await readFile("./src/templates/index.css", "UTF-8");
};

/**
 *
 * @param {*} data
 * @param {string} toFill
 * @returns {string} filled HTML template as string
 */
const fill = async (data, toFill) => {
  if (typeof toFill === "undefined") toFill = await template();

  for (const k in data) {
    if (typeof data[k] === "object") toFill = fill(data[k], toFill);
    else toFill = toFill.replace(new RegExp(`_${k}_`, "gmi"), data[k]);
  }

  return toFill;
};

const Card = async data =>
  fill(
    {
      ...data,
      additional: data.github
        ? data.github
        : data.officeNumber
        ? data.officeNumber
        : data.school
    },
    await cardTemplate()
  );

const generate = async data => {
  return fill({
    ...data,
    "<style></style>": `<style>${await styleTemplate()}</style>`
  });
};

module.exports = { generate, Card, writeFile };
