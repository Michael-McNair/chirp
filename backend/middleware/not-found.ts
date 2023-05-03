const notFound = (req, res) => {
  res.status(404).send("404 page doesn't exist");
};

module.exports = notFound;
