const path = require("path");

/**
 * given a file name as sting and an options object return the path
 * the object accept the following properties: directory and extension (dot not required)
 * @param {string} fileName
 * @param {object} options
 * @returns
 */
const getPath = (fileName, options) => {
  const { directory = "db", extension = "json" } = options;

  return path.join(__dirname, `./${directory}/${fileName}.${extension}`);
};

module.exports = {
  getPath,
};
