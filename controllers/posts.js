import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {   //image get passing through middleware 
  try {
    const { userId, description, picturePath } = req.body;  //frontend gone a send us 
    const user = await User.findById(userId);  //user wantt o add the picture 
    const newPost = new Post({  //create new post in the database 
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save(); //to save the post

    const post = await Post.find();  //we grab all the post and return 
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {  //grab all the posts of everyone 
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {  //grab users post 
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;  //to grab particular user
    const { userId } = req.body;  // grab user body from frontend 
    const post = await Post.findById(id); 
    const isLiked = post.likes.get(userId); //posts liked or not by user 

    if (isLiked) {  //if post is liked 
      post.likes.delete(userId);  //deleet the useid
    } else {
      post.likes.set(userId, true);  //set user id to true
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );  //to update the secific post 

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};