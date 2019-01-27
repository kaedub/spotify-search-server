/** Using jsonschema is overkill for a small application */
function validateInput(schema) {
  return (req, res, next) => {
    const result = validate(req.query, schema);

    if (!result.valid) {
      let error = {};
      error.message = result.errors.map(error => error.stack);
      error.status = 400;
      return next(error);
    }
    return next();
  };
}

module.exports = validateInput;