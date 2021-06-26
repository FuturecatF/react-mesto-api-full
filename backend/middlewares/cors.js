const allowedCors = [
  'https://api.futurecat.nomoredomains.club',
  'http://api.futurecat.nomoredomains.club',
  'localhost:3000',
];

const cors = (req, res, next) => {
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
};

module.exports = {
  cors,
};
