let logging = require("../logging.js")
const {
    Referendum
} = require('../models')
const Sequelize = require('sequelize')

const getReferendum = async (req, res) => {

    if ("id" in req.body) {
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
    else {
        res.status(400).send("Request missing required properties")
    }

}


const addVote = async (req, res) => {
    req.body.forEach(element => {
        console.log(element.id + "this");
        updateVotes(element.id, element.vote);
    });
    res.status(200).send("Votes Ok");
}


async function updateVotes(id, vote) {

    votes_yes1 = 0;
    votes_no1 = 0;

    try {
        const result = await Referendum.findOne({
            where: {
                id: id
            }
        })
            .then(referendum => {
                console.log(referendum.id);
                console.log(referendum.votes_yes);
                votes_yes1 = referendum.votes_yes;
                votes_no1 = referendum.votes_no;
              
            });



    } catch (error) {
        // res.status(400).send("Error on Getting Initial Votes");
        console.log(error)
    }


    if (vote === "yes")
        try {
            const result = await
                Referendum.update(
                    { votes_yes: votes_yes1 + 1 },
                    {
                        where: {
                            id: id
                        }
                    }

                )

        } catch (error) {
            // res.status(400).send("Error on Updating Vote +1");
            console.log(error)
        }
    else {
        try {
            const result = await
                Referendum.update(
                    { votes_no: votes_no1 + 1 },
                    {
                        where: {
                            id: id
                        }
                    }

                )

        } catch (error) {
            // res.status(400).send("Error on Updating Vote +1");
            console.log(error)
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
    },
    '/addVote':
    {
        post: {
            action: addVote,
            level: 'public'
        }
    }


}
