const User = require('../user/model');
const Auth = require('./model');
const authValidator = require('./validator/validator');
const userValidator = require('../user/validator/validator');

const ClientError = require("../../exceptions/ClientError");

require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  signUp: async (req, res) => {
    const { full_name, phone_number, email, password } = req.body;

    try {
      await authValidator.validateSignUpPayload( { full_name, phone_number, email, password });
      await userValidator.validateEmailNotRegistered(email);
      await userValidator.validatePhoneNumberNotRegistered(phone_number);
      const hashedPassword = bcrypt.hashSync(password, 10);

      const user = new User({ full_name, phone_number, email, password: hashedPassword });
      await user.save();
      return res.status(201).json(
        {
          status: "success",
          message: "Success register user",
        }
      );
    } catch (err) {
      console.log(err);

      if (err instanceof ClientError) {
        return res.status(err.statusCode).json(
          {
            status: "fail",
            message: err.message,
          }
        );
      }

      return res.status(500).json(
        {
          status: "fail",
          message: "Internal server error",
        }
      );
    }
  },
  signIn : async (req, res) => {
    const { email, password } = req.body;

    try {
      await authValidator.validateSignInPayload({ email, password });
      await userValidator.validateEmailIsRegistered(email);

      const user = await User.findOne({ email });
      await userValidator.validatePasswordIsCorrect(user._id, password);

      // create access token and refresh token
      const accessToken = jwt.sign(
        {
          id: user._id,
        },
        process.env.ACCESS_TOKEN_KEY,
        { expiresIn: 15 },
      );
      const refreshToken = jwt.sign(
        {
          id: user._id,
        },
        process.env.REFRESH_TOKEN_KEY,
        { expiresIn: '60d' },
      );

      const auth = new Auth({ refresh_token: refreshToken });
      await auth.save();

      return res.json({
        status: 'success',
        message: 'Success login',
        data: {
          accessToken,
          refreshToken,
        }
      });
    } catch (err) {
      console.log(err);

      if (err instanceof ClientError) {
        return res.status(err.statusCode).json(
          {
            status: "fail",
            message: err.message,
          }
        );
      }

      return res.status(500).json(
        {
          status: "fail",
          message: "Internal server error",
        }
      );
    }
  },
};
