let logging = require("../logging.js")
const {
    Referendum
} = require('../models')
const Sequelize = require('sequelize')

const getReferendum = async (req, res) => {

    if("id" in req.body)
    {
        const { id } = req.body;
        Referendum.findOne({
            where: {
                id: id
            },
            attributes: [
                "name",
                "face",
                "description",
            ]
    
        })
        .then(referendum => {
            logging.LOG(__filename, 21, "Referendum " + referendum)
            
            if (referendum !== null) {
                res.status(200).send(referendum);
            }
            else {
                res.status(400).send("Referendum Doesn't Exist");
            }
    
        });
    }
    else
    {
        res.status(400).send("Request missing required properties")
    }

}



//   const reg = async (req, res) => {
//     try {
//         console.log(req.body);
//         const { 
//             firstName,
//             lastName,
//             email,
//             pwd,
//             cnp,
//             voted_events
//         } = req.body;

//         const newReferendum = await Referendum.create({
//             firstName,
//             lastName,
//             email,
//             pwd,
//             cnp,
//             voted_events

//         });
//         res.status(200).send("register successful");

//       } catch (err) {
//         res.status(400).json({
//           error: err
//         });
//       }


//   }



module.exports = {
    '/getReferendum': {

        get: {
            action: getReferendum,
            level: 'public'
        }
    }

}
