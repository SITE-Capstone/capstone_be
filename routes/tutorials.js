// const express = require("express");
// const User = require("../models/user");
// const { createUserJwt } = require("../utils/tokens");
// const security = require("../middleware/security");
// const router = express.Router();

// router.put("/completed", async (req, res, next) => {
//   try {
//     const user = await User.login(req.body);
//     const token = createUserJwt(user);
//     return res.status(200).json({ user, token });
//   } catch (err) {
//     next(err);
//   }
// });



// router.get("/completed", security.requireAuthenticatedUser, async (req, res, next) => {
//     console.log(res.locals.user)
//   try {
//     const { username } = res.locals.user;
//     const user = await User.fetchUserByUsername(username);
//     const publicUser = User.makePublicUser(user);
//     return res.status(200).json({ user: publicUser });
//   } catch (err) {
//     next(err);
//   }
// });

// module.exports = router;
