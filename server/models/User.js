import mongoose from "mongoose";

// taken from the previously drawn up database schemas between Users and friends and posts
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true
    },
    password: {
      type: String,
      require: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    Occupation: String,
    viewedProfile: Number,
    impressions: Number,
   }, {timestamps: true}
);

// first make a schema then put it into a mongoose.model
const User = mongoose.model("User", UserSchema);
export default User;