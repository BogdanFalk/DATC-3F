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

const addVote = async (req, res) => {
    if ("id" in req.body) {
        votesNumber = 0;
        const { id } = req.body;

        try {
            const result = await Candidate.findOne({
                where: {
                    id: id
                }
            })
                .then(candidate => {
                    console.log(candidate.id);
                    console.log(candidate.votesIn);
                    votesNumber = candidate.votesIn;
                    console.log(votesNumber);
                });



        } catch (error) {
            res.status(400).send("Error on Getting Initial Votes");
        }

        console.log(votesNumber);
        try {
            const result = await
                Candidate.update(
                    { votesIn: votesNumber + 1 },
                    {
                        where: {
                            id: id
                        }
                    }

                )
            res.status(200).send("Vote Ok");
        } catch (error) {
            res.status(400).send("Error on Updating Vote +1");
        }
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
    },
    '/addVote':
    {
        post: {
            action: addVote,
            level: 'public'
        }
    }


}
