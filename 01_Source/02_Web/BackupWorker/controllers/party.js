let logging = require("../logging.js")
const {
    Party
} = require('../models')
const Sequelize = require('sequelize')

const getParty = async (req, res) => {

    if ("id" in req.body) {
        const { id } = req.body;
        Party.findOne({
            where: {
                id: id
            },
            attributes: [
                "name",
                "face",
                "description",
            ]

        })
            .then(party => {
                logging.LOG(__filename, 21, "Party " + party)

                if (party !== null) {
                    res.status(200).send(party);
                }
                else {
                    res.status(400).send("Party Doesn't Exist");
                }

            });
    }
    else {
        res.status(400).send("Request missing required properties")
    }

}

const addVote = async (req, res) => {
    if ("id" in req.body) {
        votesNumber = 0;
        const { id } = req.body;

        try {
            const result = await Party.findOne({
                where: {
                    id: id
                }
            })
                .then(party => {
                    console.log(party.id);
                    console.log(party.votesIn);
                    votesNumber = party.votesIn;
                    console.log(votesNumber);
                });



        } catch (error) {
            res.status(400).send("Error on Getting Initial Votes");
        }

        console.log(votesNumber);
        try {
            const result = await
                Party.update(
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

//         const newParty = await Party.create({
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
    '/getParty': {

        get: {
            action: getParty,
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
