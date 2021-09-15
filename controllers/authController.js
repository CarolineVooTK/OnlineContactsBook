const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/User');

const signToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

const createAndSendToken = (id, res) => {
  const token = signToken(id);

  // Send token via cookie.
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_TOKEN_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // To prevent cross-site scripting (XSS) attacks
    httpOnly: true
  };

  // Use 'https' in production.
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Send response.
  res.status(200).json({
    status: 'success',
    token
  });
};

// Test function TODO: delete later
exports.register = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  const token = signToken(newUser.id);
  res.status(201).json({
    status: 'success',
    token,
    data: { user: newUser }
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist.
  if (!email || !password) {
    return next(new AppError('Please provide your email and password', 400));
  }

  // 2) Check if email and password are correct.
  const user = await User.findOne({ email }).select('+password');

  // Ambiguous error to prevent giving info to hackers.
  if (!user || !(await argon2.verify(user.password, password))) {
    return next(new AppError('Invalid email or password', 401));
  }

  // 3) Sign and send token.
  createAndSendToken(user.id, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Get token.
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // 2) Check if token exists.
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access', 401)
    );
  }

  // 3) Verify token.
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 4) Check if user changed password after JWT was issued.
  const user = await User.findById(decoded.id);

  // Grant access to protected routes.
  req.user = user;
  next();
});
