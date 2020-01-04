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

    let flag=true;
    const banned = await bannedUser.findOne({
      where:{
        cnp
      }
    })
    if (banned !== null)
    {
      flag = false;
    }

    if(flag)
    {
      const newUser = await User.create({
        cnp
      });
      res.status(200).send("Can Vote");
    }
    else
    {
      res.status(200).send("Can't Vote!")
    }
   

  } catch (err) {
    res.status(400).json({
      error: err
    });
  }


}



module.exports = {
  '/addNewUser':{
    post:{
      action:addNewUser,
      level:'public'
    }
  }

}
