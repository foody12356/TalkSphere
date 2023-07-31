//for logic 
import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    //grab the id for the particular user information we need to 
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user); //send the information to the frontend 
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//user friend 
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all( //promise is used to call multile api 
      user.friends.map((id) => User.findById(id)) //grab all the info from friend id 
    );
    const formattedFriends = friends.map(  //format the above for frontend 
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath }; //set the info send to frontend  
      }
    );
    res.status(200).json(formattedFriends);  //pass info to frontend 
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
// fro add and remove the friends 
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params; //grab the id's of 
    const user = await User.findById(id); //find the user
    const friend = await User.findById(friendId); //find the friend 

    if (user.friends.includes(friendId)) {  //if friend is in list
      user.friends = user.friends.filter((id) => id !== friendId);  //we remove the friend 
      friend.friends = friend.friends.filter((id) => id !== id); //we remove the user form the friend user 
    } else { //if not included
      user.friends.push(friendId); //then add the friends in user list
      friend.friends.push(id); //add friend in the friend's list
    }
    await user.save();
    await friend.save(); //save this update 

    const friends = await Promise.all(   //now we format the list 
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};