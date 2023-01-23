const User = require('../user/model');
const Auth = require('./model');

const ClientError = require("../../exceptions/ClientError");
const InvariantError = require("../../exceptions/InvariantError");

require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  signUp: async (req, res) => {
    const { full_name, phone_number, email, password } = req.body;

    try {
      const hashedPassword = bcrypt.hashSync(password, 10);
      let checkUser = await User.find({ email });

      // Check if email is registered
      if (checkUser.length) {
        throw new InvariantError("Email already registered");
      }

      // Check if phone number is registered
      checkUser = await User.find({ phone_number });
      if (checkUser.length) {
        throw new InvariantError("Phone number already registered");
      }

      if (password.length < 8) {
        throw new InvariantError("Password length must equal or more than 8");
      }

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
      const user = await User.findOne({ email });

      // Check if email is not registered
      if (!user) {
        throw new InvariantError("Email not found");
      }

      // check password is valid
      if (!bcrypt.compareSync(password, user.password)) {
        throw new InvariantError("Invalid password");
      }

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
