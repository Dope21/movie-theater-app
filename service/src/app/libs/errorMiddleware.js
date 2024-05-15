export default (err, req, res, _next) => res.status(err.httpStatus).json(err)
