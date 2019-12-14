let { writeFile, readFile } = require("fs");
const { promisify } = require("util");
writeFile = promisify(writeFile);
readFile = promisify(readFile);

/** @returns {string} The root HTML template as a string. */
const template = async () => {
  return await readFile("./src/template/template.html", "UTF-8");
};

/** @returns {string} The card HTML template as a string. */
const cardTemplate = async () => {
  return await readFile("./src/template/card.html", "UTF-8");
};

const styleTemplate = async () => {
  return await readFile("./src/template/index.css", "UTF-8");
};

/**
 * Fills this string template with the given data. Replacing
 * template formats of `_key_`.
 * @param {object} data
 */
String.prototype.fill = async function(data) {
  for (const k in data) {
    if (typeof data[k] === "object") this.fill(data[k]);
    else this.replace(new RegExp(`_${k}_`), data[k]);
  }
  return this;
};

const Card = async data => cardTemplate().fill(data);

const generate = async data => {
  return template().fill({
    ...data,
    "_<style></style>_": await styleTemplate()
  });
};

module.exports = { generate, Card };
