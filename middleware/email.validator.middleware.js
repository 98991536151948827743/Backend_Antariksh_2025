import validator from 'validator';

export const strictEmailValidator = (req, res, next) => {
  const email = req.body.email;
  if (!email || !validator.isEmail(email) || !email.includes('.')) {
    return res.status(422).json({ success: false, message: 'Invalid email' });
  }
  next();
};
