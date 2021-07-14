const express = require("express");
const User = require("../models/user");
const security = require("../middleware/security");
const Tutorial = require("../models/tutorial");
const router = express.Router();

// Gets the completed statuses of all the tutorials in completed_tutorials per user_id
router.get("/cards", async (req, res, next) => {
    try {

      //Model Functions
      const tutorialCards = await Tutorial.fetchTutorialCards();
      const publicTutorials = await Tutorial.makePublicTutorialCards(tutorialCards)

      return res.status(200).json({ Tutorials: publicTutorials });
  } catch (err) {
    next(err)
    }
});

//Edits a completed tutorial to true || false based on user_id & tutorial_id
router.put("/completed", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
      //Defining the parameters
      const { tutorial_id, completed} = req.body
      const { username } = res.locals.user;
      const user = await User.fetchUserByUsername(username);
      const { id } = user;
      
      //Model Functions
      const completedTutorials = await Tutorial.editCompletedTutorials(id, tutorial_id, completed);
      const publicCompletedTutorials = await Tutorial.makePublicCompletedTutorials(completedTutorials)
      
      return res.status(200).json({ completedTutorials: publicCompletedTutorials });
    } catch (err) {
        next(err);
    }
});

// Gets the completed statuses of all the tutorials in completed_tutorials per user_id
router.get("/completed", security.requireAuthenticatedUser, async (req, res, next) => {
    try {

      //Defining the parameters
      const { username } = res.locals.user;
      const user = await User.fetchUserByUsername(username);
      const { id } = user;
      
      //Model Functions
      const completedTutorials = await Tutorial.fetchCompletedTutorialsByUserId(id);
      const publicCompletedTutorials = await Tutorial.makePublicCompletedTutorials(completedTutorials)

      return res.status(200).json({ completedTutorials: publicCompletedTutorials });
  } catch (err) {
    next(err);
  }
});

module.exports = router;