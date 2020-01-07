let logging = require("../logging.js")
const {
  adminUser
} = require('../models')
const Sequelize = require('sequelize')

const loginAdminUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("email:"+email);
  console.log("email:"+password);
  try {
    const user = await adminUser.findOne({
      where: {
        email,
        password
      },
      attributes: [
        "id",
        "email",
        "password"
      ]

    })
    if(user!==null)
    {
      res.status(200).send(user);
    }
    else
    {
      res.status(200).send("Invalid Email or Password!");
    }
    
  } catch (error) {
    res.status(400).send("Login Failed");
  } 



}




module.exports = {
  '/loginAdminUser': {
    post: {
      action: loginAdminUser,
      level: 'public'
    }
  }

}
