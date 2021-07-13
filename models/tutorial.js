const { BadRequestError } = require("../utils/errors");
const db = require("../db");

class Tutorial {
  static makePublicCompletedTutorials(completed_tutorials) {
    return {
      user_id: completed_tutorials.user_id,
      tut1: completed_tutorials.tut1,

    };
  }

  // Creates a Completed tutorials list
  static async generateCompletedTutorials(user_id) {
    //We only need a user Id since all tutorials will default to false
    const requiredFields = ["user_id"];

      if (!user_id) {
        throw new BadRequestError(`Missing ${user_id} in request body.`);
    }

    const existingCompletedTutorials = await Tutorial.fetchCompletedTutorialsByUserId(user_id);

    if (existingCompletedTutorials) {
      throw new BadRequestError(`A Completed Tutorials already exists with User_ID: ${user_id}`);
    }

    const completedTutorialsResult = await db.query(
      ` INSERT INTO completed_tutorials (user_id)
        VALUES ($1)
        RETURNING user_id, tut1;
      `,
      [user_id]
    );

    const completed_tutorials = completedTutorialsResult.rows[0];
    console.log("Tutorial class", Tutorial.makePublicCompletedTutorials(completed_tutorials))
    return Tutorial.makePublicCompletedTutorials(completed_tutorials);
  }

  // fetches the CompletedTutorials with the user_id
  static async fetchCompletedTutorialsByUserId(user_id) {
    if (!user_id) {
      throw new BadRequestError("No user_id provided");
    }

    const query = `SELECT * FROM completed_tutorials WHERE user_id = $1`;

    const result = await db.query(query, [user_id]);

    const completed_tutorials = result.rows[0];

    return completed_tutorials;
  }
}


module.exports = Tutorial;

