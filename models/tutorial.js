const { BadRequestError } = require("../utils/errors");
const db = require("../db");

class Tutorial {
  static makePublicCompletedTutorials(completed_tutorials) {
    return completed_tutorials;
  }
  static makePublicTutorialCards(completed_tutorials) {
    return completed_tutorials;
  }

  // Creates & assigns a Completed tutorials list to a user_id
  static async generateCompletedTutorials(user_id) {
    if (!user_id) {
      throw new BadRequestError(`Missing user_id in request body.`);
    }

    //Will default to false
    const completedTutorialsResult = await db.query(
      ` 
    INSERT INTO completed_tutorials (user_id, tutorial_id)
    VALUES ($1,1),($1,2),($1,3),($1,4),($1,5),($1,6),($1,7),($1,8),($1,9)
    RETURNING completed_tutorials;
    `,
      [user_id]
    );

    const completed_tutorials = completedTutorialsResult.rows;
    console.log("Tutorial class->Generated", Tutorial.makePublicCompletedTutorials(completed_tutorials));
    return completed_tutorials;
  }

  // fetches the CompletedTutorials with the user_id
  static async fetchCompletedTutorialsByUserId(user_id) {
    if (!user_id) {
      throw new BadRequestError("No user_id provided");
    }
    const fetchQuery = `SELECT * FROM completed_tutorials WHERE user_id = $1`;
    const result = await db.query(fetchQuery, [user_id]);

    const completed_tutorials = result.rows;
    console.log("Tutorial class->Fetched", Tutorial.makePublicCompletedTutorials(completed_tutorials));
    return completed_tutorials;
  }

  // fetches the CompletedTutorials with the user_id and tutorial_id
  static async fetchSingleTutorial(user_id, tutorial_id) {
    if (!user_id) {
      throw new BadRequestError("No user_id provided");
    }
    if (!tutorial_id) {
      throw new BadRequestError("No tutorial_id provided");
    }
    const fetchQuery = `SELECT * FROM completed_tutorials WHERE user_id = $1 AND tutorial_id = $2`;
    const result = await db.query(fetchQuery, [user_id, tutorial_id]);

    const completed_tutorials = result.rows;
    console.log("Single tutorial->Fetched", Tutorial.makePublicCompletedTutorials(completed_tutorials));
    return completed_tutorials;
  }

  static async editCompletedTutorials(user_id, tutorial_id, completed) {
    if (!user_id) {
      throw new BadRequestError(`Missing user_id in request body.`);
    }
    if (!tutorial_id) {
      throw new BadRequestError(`Missing tutorial_id in request body.`);
    }
    if (!(completed === 1 || completed === 0)) {
      throw new BadRequestError(`Missing completed in request body.`);
    }

    //First db.query edits the table
    const editQuery = ` 
    UPDATE completed_tutorials
    SET completed = $3
    WHERE user_id = $1 AND tutorial_id = $2;
    `;
    await db.query(editQuery, [user_id, tutorial_id, completed]);

    //Second db.query returns the table
    const resultQuery = ` 
    SELECT * FROM completed_tutorials
    WHERE user_id = $1 AND tutorial_id = $2;
    `;
    const completedTutorialsResult = await db.query(resultQuery, [user_id, tutorial_id]);

    const completed_tutorials = completedTutorialsResult.rows;
    console.log("Tutorial class->editCompletedTutorials", Tutorial.makePublicCompletedTutorials(completed_tutorials));
    return completed_tutorials;
  }

  // fetches all Tutorial Card data
  static async fetchTutorialCards() {
    const fetchQuery = `SELECT * FROM tutorials`;
    const result = await db.query(fetchQuery);

    const tutorials = result.rows;
    // console.log("Tutorial class->Fetched Cards", Tutorial.makePublicCompletedTutorials(tutorials))
    console.log("Tutorial class->Fetched Cards", tutorials);
    return tutorials;
  }
}

module.exports = Tutorial;
