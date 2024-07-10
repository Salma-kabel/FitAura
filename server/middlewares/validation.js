const { body } = require('express-validator');

exports.validate = (method) => {
  switch (method) {
    case 'register': {
      return [
        body('username')
          .isLength({ min: 3 })
          .withMessage('Username must be at least 3 characters long'),
        body('email').isEmail().withMessage('Invalid email'),
        body('password')
          .isLength({ min: 6 })
          .withMessage('Password must be at least 6 characters long'),
        body('passwordConfirmation').custom((value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('Passwords must match');
          }
          return true;
        }),
        body('gender')
          .optional()
          .isIn(['male', 'female'])
          .withMessage('Invalid gender'),
        body('age')
          .optional()
          .isInt({ min: 0 })
          .withMessage('Age must be a positive integer'),
        body('weight')
          .optional()
          .isFloat({ min: 0 })
          .withMessage('Weight must be a positive number'),
        body('height')
          .optional()
          .isFloat({ min: 0 })
          .withMessage('Height must be a positive number'),
        body('bodyFatPercent')
          .optional()
          .isFloat({ min: 0, max: 100 })
          .withMessage('Body fat percent must be between 0 and 100'),
        body('muscleMassPercent')
          .optional()
          .isFloat({ min: 0, max: 100 })
          .withMessage('Muscle mass percent must be between 0 and 100'),
        body('goalWeight')
          .optional()
          .isFloat({ min: 0 })
          .withMessage('Goal weight must be a positive number'),
        body('goalBodyFatPercent')
          .optional()
          .isFloat({ min: 0, max: 100 })
          .withMessage('Goal body fat percent must be between 0 and 100'),
        body('goalMuscleMassPercent')
          .optional()
          .isFloat({ min: 0, max: 100 })
          .withMessage('Goal muscle mass percent must be between 0 and 100'),
      ];
    }
    case 'login': {
      return [
        body('email').isEmail().withMessage('Invalid email'),
        body('password')
          .isLength({ min: 6 })
          .withMessage('Password must be at least 6 characters long'),
      ];
    }
    case 'requestPasswordReset': {
      return [body('email').isEmail().withMessage('Invalid email')];
    }
  }
};
