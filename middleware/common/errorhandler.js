const createError = require('http-errors');
// not found
const notFoundHandler = (req, res, next) => {
  next(createError(404, 'Your requested content was not found'));
};

const errorHandler = (err, req, res, next) => {
  res.locals.error =
    process.env.NODE_ENV === 'development'
      ? { message: err, status: err.status }
      : { message: err.message, status: err.status };

  res.status = err.status;
  if (res.locals.html) {
    console.log('render');
    res.render('error', { title: 'Error Page' });
  } else {
    res.json(res.locals.error);
  }
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
