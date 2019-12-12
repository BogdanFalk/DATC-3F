let logging = require("../logging.js")
const {
    Candidate
} = require('../models')
const Sequelize = require('sequelize')

const getCandidate = async (req, res) => {

    if("id" in req.body)
    {
        const { id } = req.body;
        Candidate.findOne({
            where: {
                id: id
            },
            attributes: [
                "name",
                "face",
                "description",
            ]
    
        })
        .then(candidate => {
            logging.LOG(__filename, 21, "Candidate " + candidate)
            
            if (candidate !== null) {
                res.status(200).send(candidate);
            }
            else {
                res.status(400).send("Candidate Doesn't Exist");
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

//         const newCandidate = await Candidate.create({
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
    '/getCandidate': {

        get: {
            action: getCandidate,
            level: 'public'
        }
    }

}
