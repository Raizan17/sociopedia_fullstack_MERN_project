import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,

} from "../controllers/users.js";
import {verifyToken} from "../middleware/auth.js";

const router = express.Router();

// CRUD is Create Read Update Delete

// Read routes are routes where we are just grabbing information Read is part of R in CRUD

/* READ */
// here we can use a querystring in the frontend to grab a particular id to be used here which will then be used as /users/{:someid}
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
// we want to use router.patch for update
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;