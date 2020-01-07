const {
  User, bannedUser
} = require('../models')
const Sequelize = require('sequelize')

const addNewUser = async (req, res) => {
  try {
    console.log(req.body);
    const {
      cnp,
    } = req.body;

    let flag = true;
    const banned = await bannedUser.findOne({
      where: {
        cnp
      }
    })
    if (banned !== null) {
      flag = false;
    }

    const user = await User.findOne({
      where: {
        cnp
      }
    })
    console.log(user);
    if (user !== null) {
      if (flag) {
        res.status(200).send("Can Vote");
      }
      else {
        res.status(200).send("Can't Vote!")
      }
    }
    else
    {
      if (flag) {
        const newUser = await User.create({
          cnp
        });
        console.log("adding");  
        res.status(200).send("Can Vote And Added");
      }
      else {
        res.status(200).send("Can't Vote!")
      }
    }


  } catch (err) {
    res.status(400).send({
      error: err
    });
  }


}



module.exports = {
  '/addNewUser': {
    post: {
      action: addNewUser,
      level: 'public'
    }
  }

}
