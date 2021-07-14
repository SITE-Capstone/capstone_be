const { BadRequestError } = require("../utils/errors");
const db = require("../db");

class Tutorial {
  static makePublicCompletedTutorials(completed_tutorials) {
    return completed_tutorials
  }

  // Creates a Completed tutorials list
  static async generateCompletedTutorials(user_id) {
    //We only need a user Id since all tutorials will default to false
    const requiredFields = ["user_id"]

      if (!user_id) {
        throw new BadRequestError(`Missing ${user_id} in request body.`);
    }

// const existingCompletedTutorials = await Tutorial.fetchCompletedTutorialsByUserId(user\_id);
// if (existingCompletedTutorials) {
//   throw new BadRequestError(`A Completed Tutorials already exists with User\_ID: ${user\_id}`);
// }

    const completedTutorialsResult = await db.query(
      ` INSERT INTO completed_tutorials (user_id, tutorial_id)
        VALUES ($1,1),($1,2),($1,3),($1,4),($1,5),($1,6),($1,7),($1,8),($1,9)
        RETURNING completed_tutorials;
      `,
      [user_id]
    );

    const completed_tutorials = completedTutorialsResult.rows;
    console.log("Tutorial class->Generated", Tutorial.makePublicCompletedTutorials(completed_tutorials))
    return Tutorial.makePublicCompletedTutorials(completed_tutorials);
  }

  // fetches the CompletedTutorials with the user_id_
  static async fetchCompletedTutorialsByUserId(user_id) {
    if (!user_id) {
      throw new BadRequestError("No user_id provided");
    }
      const query = `SELECT * FROM completed_tutorials WHERE user_id = $1`;
    const result = await db.query(query, [user_id]);


    const completed_tutorials = result.rows;
    console.log("Tutorial class->Fetched", Tutorial.makePublicCompletedTutorials(completed_tutorials))
    return completed_tutorials;
  }

  static async editCompletedTutorials(user_id, tutorial_id, completed) {
    const requiredFields = ["user_id", "tutorial_id", "completed"]

      if (!user_id) {
        throw new BadRequestError(`Missing ${user_id} in request body.`);
    }
      if (!tutorial_id) {
        throw new BadRequestError(`Missing ${tutorial_id} in request body.`);
    }


    const editCompletedTutorials = await db.query(
      ` 
        UPDATE completed_tutorials
        SET completed = $3
        WHERE user_id = $1 AND tutorial_id = $2;
      `,
      [user_id, tutorial_id, completed]
    );
    const completedTutorialsResult = await db.query(
      ` 
        SELECT * FROM completed_tutorials
        WHERE user_id = $1 AND tutorial_id = $2;
      `,
      [user_id, tutorial_id]
    );

    const completed_tutorials = completedTutorialsResult.rows;
    console.log("Tutorial class->completed?", Tutorial.makePublicCompletedTutorials(completed_tutorials))
    return Tutorial.makePublicCompletedTutorials(completed_tutorials);
  }

}

module.exports = Tutorial;