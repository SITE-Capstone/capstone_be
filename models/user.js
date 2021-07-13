const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");
const { BadRequestError } = require("../utils/errors");
const db = require("../db");
const Wallet = require("./wallet");
const Tutorial = require("./tutorial");

class User {
  // choose what to return to the user so password is
  // not returned to body after signup or login
  static makePublicUser(user) {
    return {
      id: user.id,
      username: user.username,
      createdAt: user.created_at,
    };
  }

  // USER LOGIN
  static async login(credentials) {
    // require the usernameOrEmail and password fields to be filled in request body.
    let item;
    const requiredFields = ["usernameOrEmail", "password"];
    requiredFields.forEach((property) => {
      if (property == "usernameOrEmail") {
        item = "username or email";
      } else {
        item = "password";
      }
      if (!credentials.hasOwnProperty(property)) {
        throw new BadRequestError(`Missing ${item} in request body.`);
      }
    });

    const userEmail = await User.fetchUserByEmail(credentials.usernameOrEmail);

    const userUsername = await User.fetchUserByUsername(credentials.usernameOrEmail);

    if (userEmail || userUsername) {
      const isValid = await bcrypt.compare(
        credentials.password,
        userEmail ? userEmail.password : userUsername.password
      );
      if (isValid) {
        return User.makePublicUser(userEmail || userUsername);
      }
    }

    throw new UnauthorizedError("Invalid email/password");
  }

  // USER REGISTER
  static async register(credentials) {
    const requiredFields = ["email", "password", "firstName", "lastName", "username"];
    requiredFields.forEach((property) => {
      if (!credentials.hasOwnProperty(property)) {
        throw new BadRequestError(`Missing ${property} in request body.`);
      }
    });

    if (credentials.email.indexOf("@") <= 0) {
      throw new BadRequestError("Invalid email.");
    }

    const existingUserEmail = await User.fetchUserByEmail(credentials.email);
    if (existingUserEmail) {
      throw new BadRequestError(`A user already exists with email: ${credentials.email}`);
    }

    const existingUsername = await User.fetchUserByUsername(credentials.username);
    if (existingUsername) {
      throw new BadRequestError(`A user already exists with username: ${credentials.username}`);
    }

    const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR);
    const normalizedEmail = credentials.email.toLowerCase();
    const normalizedUsername = credentials.username.toLowerCase();

    const userResult = await db.query(
      ` INSERT INTO users (first_name, last_name, username, email, password)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, first_name, last_name, username, email, created_at;
      `,
      [credentials.firstName, credentials.lastName, normalizedUsername, normalizedEmail, hashedPassword]
    );

    const user = userResult.rows[0];

    //Creates User Wallet & Tutorials List once User has been created
    Wallet.generateWallet(user.id);
    Tutorial.generateCompletedTutorials(user.id);

    return User.makePublicUser(user);
  }

  // get a single user by their email
  static async fetchUserByEmail(email) {
    if (!email) {
      throw new BadRequestError("No email provided");
    }

    const query = `SELECT * FROM users WHERE email = $1`;

    const result = await db.query(query, [email.toLowerCase()]);

    const user = result.rows[0];

    return user;
  }

  // get a single user by their username
  static async fetchUserByUsername(username) {
    if (!username) {
      throw new BadRequestError("No username provided");
    }

    const query = `SELECT * FROM users WHERE username = $1`;

    const result = await db.query(query, [username.toLowerCase()]);

    const user = result.rows[0];

    return user;
  }
}

module.exports = User;
