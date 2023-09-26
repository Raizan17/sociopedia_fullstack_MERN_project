import Post from "../models/Post.js";

/* CREATE */
export const createPost = async (req, res) => {
  try{
    const {userId, description, picturePath} = req.body;
    const user = await User.findbyId(userId);
    const newPost = new Post( {
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: []
    })
// saves post into the MongoDB database
    await newPost.save();
//grabs all the posts
    const post = await Post.find();
// returns all the posts to the frontend for an updated posts list
    res.status(201).json(post);

// this is why backend is harded than frontend since you have to know how the returned values will be used in front end so you have to format and provide the returns accordingly
  } catch (err) {
    res.status(409).json({message: err.message});
  }

}

/* READ */
export const getFeedPosts = async (req, res) => {
  try{
    const post = await Post.find();
    // status 201 means we created something 200 just means successfully completed task
    res.status(200).json(post);
  }catch (err) {
    res.status(404).json({message: err.message});
  }

}

// only grabs userfeed posts
export const getUserPosts = async (req, res) => {
  try{
    const {userId} = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  }catch (err) {
    res.status(404).json({message: err.message});
  }
}

/* UPDATE */
export const likePost = async (req, res) => {
  try{
    const {id} = req.params;
    const { userId} = req.body;
    // Grabbing Post information
    const post = await Post.findbyId(id);
    // Grabbing whether user has liked it or not
    const isLiked = post.likes.get(userId);

    // if userId exists here that means that post was liked by the user if yes we delete it if not we set it

    if (isLiked) {
      // delete user from liked if they have liked already
      post.likes.delete(userId);
    }else{
      // otherwise set the user as list of liked
      post.likes.set(userId, true);
    }

    // update the post by finding it first and passing it the new likes
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {likes: post.likes},
      {new: true}
    );

    // pass the updated Post so we can update the frontend, and we always have to update the frontend once we hit the like button
    res.status(200).json(updatedPost);
  }catch (err) {
    res.status(404).json({message: err.message});
  }
}