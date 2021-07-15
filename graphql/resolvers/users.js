const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const {
  validateSignUpInput,
  validateLoginInput,
} = require("../../util/validators");
const User = require("../../models/User");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.SECRET_KEY,
    { expiresIn: "2h" }
  );
};

module.exports = {
  Query: {
      async getUserBeUsername(_, {username}) {
          try {
              const user = await User.findOne({username: username})
              if (user) {
                  return user
              } else {
                  throw new Error("There is no user by that username")
              }
          } catch (error) {
              throw new Error(error)
          }
      }
  },
  Mutation: {
    async login(_, { username, password }) {
      const { valid, errors } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Password is incorrect";
        throw new UserInputError("Wrong Credentials", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async signUp(
      _,
      { singUpInput: { username, email, password, confirmPassword } }
    ) {
      const { valid, errors } = validateSignUpInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "A username is already registered for this email",
          },
        });
      }

      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
