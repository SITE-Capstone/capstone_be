const { BadRequestError } = require("../utils/errors")

class User {
  // choose what to return to the user so password is 
  // not returned to body after signup or login
  static makePublicUser(user) {
    return {
      id: user.id,
      username: user.username,
      createdAt = user.created_at,
    };
  }

  // USER LOGIN
  

  // USER REGISTER

  // get a single user by their email
  static async fetchUserByEmail(email) {
    if (!email) {
      throw new BadRequestError("No email provided");
    }

    const query = `SELECT * FROM users WHERE email = $1`

    const result = await db.query(query, [email.toLowerCase()]);

    const user = result.rows[0];

    return user;
  }

  // get a single user by their username
  static async fetchUserByUsername(username) {
    if (!username) {
      throw new BadRequestError("No username provided");
    }

    const query = `SELECT * FROM users WHERE username = $1`

    const result = await db.query(query,[username.toLowerCase()]);

    const user = result.rows[0]

    return user;
  }
}

module.exports = User;