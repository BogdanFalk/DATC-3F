let logging = require("../logging.js")
const { Event, Candidate, Party, Referendum } = require('../models')
const Sequelize = require('sequelize')
var serverMQTT = require("../herokuCloudMQTT.js")
// const bcrypt = require("bcrypt-nodejs");

const getAllEvents = async (req, res) => {
    Event.findAll({
        attributes: ["title", "type", "date",]
    }).then(event => {
        res.send(event)
    })
}

const getEvent = async (req, res) => {
    if ("id" in req.body) {
        const { id } = req.body;

        Event.findOne({
            where: {
                id: id
            },
            attributes: ["title", "type", "date",]

        }).then(event => {
            let flag = false;
            logging.LOG(__filename, 37, "Event " + event)
            if (event !== null) {
                res.status(200).send(event);
            } else {
                res.status(400).send("Event Doesn't Exist");
            }

        });
    } else {
        res.status(400).send("Request missing required properties");
    }

}

const getAllEventsWithAssociates = async (req, res) => {
    var allEvents = {};
    try {
        let eventPresident = await Event.findAll({
            where: {
                type: "presidential"
            },
            include: [
                {
                    model: Candidate,
                    as: 'candidate'
                }
            ]

        });

        let eventParliamentary = await Event.findAll({
            where: {
                type: "parliamentary"
            },
            include: [
                {
                    model: Party,
                    as: 'party'
                }
            ]

        });

        let eventReferendum = await Event.findAll({
            where: {
                type: "referendum"
            },
            include: [
                {
                    model: Referendum,
                    as: 'referendum'
                }
            ]

        })
        allEvents.eventPresident = eventPresident;
        allEvents.eventParliamentary = eventParliamentary;
        allEvents.eventReferendum = eventReferendum;
        if (allEvents.length == 0)
            throw "Event Doesn't Exist";

        res.status(200).send(allEvents);

    } catch (error) {
        res.status(400).send(error);
    }

}


const getEventWithAssociates = async (req, res) => {
    if ("id" in req.body) {

        const { id } = req.body;

        let eventType = "";
        Event.findOne({
            where: {
                id: id
            },
            attributes: [
                "title", "type", "date",
            ],
            include: [
                {
                    model: Candidate,
                    as: 'candidate',
                    attributes: ["id", "name", "description", "party", "votesIn", "votesOut"]
                }
            ]

        }).then(event => {
            eventType = event.type;
            switch (eventType) {
                case "presidential":
                    {
                        Event.findOne({
                            where: {
                                id: id
                            },
                            attributes: [
                                "id", "title", "type", "date",
                            ],
                            include: [
                                {
                                    model: Candidate,
                                    as: 'candidate',
                                    attributes: ["id", "name", "description", "party", "votesIn", "votesOut"]
                                }
                            ]

                        }).then(event => {
                            logging.LOG(__filename, 37, "Event " + event)
                            if (event !== null) {

                                res.status(200).send(event);
                            } else {
                                res.status(400).send("Event Doesn't Exist");
                            }

                        });
                        break;
                    }
                case "parliamentary":
                    {
                        Event.findOne({
                            where: {
                                id: id
                            },
                            attributes: [
                                "id", "title", "type", "date",
                            ],
                            include: [
                                {
                                    model: Party,
                                    as: 'party'
                                }
                            ]

                        }).then(event => {
                            logging.LOG(__filename, 37, "Event " + event)
                            if (event !== null) {

                                res.status(200).send(event);
                            } else {
                                res.status(400).send("Event Doesn't Exist");
                            }

                        });
                        break;
                    }
                case "referendum":
                    {
                        Event.findOne({
                            where: {
                                id: id
                            },
                            attributes: [
                                "id", "title", "type", "date",
                            ],
                            include: [
                                {
                                    model: Referendum,
                                    as: 'referendum'
                                }
                            ]

                        }).then(event => {
                            logging.LOG(__filename, 37, "Event " + event)
                            if (event !== null) {

                                res.status(200).send(event);
                            } else {
                                res.status(400).send("Event Doesn't Exist");
                            }

                        });
                        break;
                    }

                default:
                    res.status(400).send("Requested event has unknown type");
                    break;
            }
        })




    } else {
        res.status(400).send("Request missing required properties");
    }


}



const updateVoteCounter = async (req, res) => {
    if ("id" in req.body) {
        if ("title" in req.body) {
            const { id } = req.body;
            const { title } = req.body;
            switch (Event.type) {
                case "presidential":
                    {
                        Event.findOne({
                            where: {
                                id: id
                            },
                            attributes: [
                                "title", "type", "date",
                            ],
                            include: [
                                {
                                    model: Candidate,
                                    as: 'candidate',
                                    attributes: ["id", "name", "description", "party", "votesIn", "votesOut"]
                                }
                            ]

                        }).then(event => {
                            logging.LOG(__filename, 37, "Event " + event)
                            if (event !== null) {

                                res.status(200).send(event);
                            } else {
                                res.status(400).send("Event Doesn't Exist");
                            }

                        });
                        break;
                    }
                case "parliamentary":
                    {
                        Event.findOne({
                            where: {
                                id: id
                            },
                            attributes: [
                                "title", "type", "date",
                            ],
                            include: [
                                {
                                    model: Party,
                                    as: 'party'
                                }
                            ]

                        }).then(event => {
                            logging.LOG(__filename, 37, "Event " + event)
                            if (event !== null) {

                                res.status(200).send(event);
                            } else {
                                res.status(400).send("Event Doesn't Exist");
                            }

                        });
                        break;
                    }
                case "referendum":
                    {
                        Event.findOne({
                            where: {
                                id: id
                            },
                            attributes: [
                                "title", "type", "date",
                            ],
                            include: [
                                {
                                    model: Referendum,
                                    as: 'referendum'
                                }
                            ]

                        }).then(event => {
                            logging.LOG(__filename, 37, "Event " + event)
                            if (event !== null) {

                                res.status(200).send(event);
                            } else {
                                res.status(400).send("Event Doesn't Exist");
                            }

                        });
                        break;
                    }

                default:
                    res.status(400).send("Requested event has unknown type");
                    break;
            }


        } else {
            res.status(400).send("Request missing required properties");
        }
    } else {
        res.status(400).send("Request missing required properties");
    }

}

const deleteEventWithAssociates = async (req, res) => {

    try {
        if ("name" in req.body) {
            const { name } = req.body;
            console.log(name)

            Event.findOne({
                where: {
                    title: name
                },
                attributes: [
                    "title", "type", "date",
                ]

            }).then(event => {
                if (event !== null) {
                    eventType = event.type;
                    switch (eventType) {
                        case "presidential":
                            {
                                Event.findOne({
                                    where: {
                                        title: name
                                    },
                                    attributes: [
                                        "title", "type", "id"
                                    ],
                                    include: [
                                        {
                                            model: Candidate,
                                            as: 'candidate',
                                            attributes: [
                                                "name", "face", "description", "party"
                                            ]
                                        }
                                    ]

                                }).then(event => {
                                    logging.LOG(__filename, 37, "Event " + event)
                                    if (event !== null) {
                                        event.type = "Presidentials"
                                        event.dataValues.candidates = event.dataValues.candidate;
                                        delete event.dataValues.candidate;
                                        event.dataValues.parties = [];
                                        event.dataValues.questions = [];
                                        console.log(event)
                                        serverMQTT.client.publish('api/mqtt/vote', JSON.stringify(event), function () {
                                            logging.LOG(__filename, 27, "Message is published");
                                            // client.end(); // Close the connection when published
                                        });
                                        event.dataValues.candidates.forEach(element => {
                                            const result = Candidate.destroy({
                                                where:
                                                {
                                                    eventId: event.id
                                                }
                                            })
                                        });

                                        Event.destroy({
                                            where:
                                            {
                                                title: name
                                            }
                                        })
                                        res.status(200).send("Deleted");
                                    } else {
                                        res.status(400).send("Event Doesn't Exist");
                                    }

                                });
                                break;
                            }
                        case "parliamentary":
                            {
                                Event.findOne({
                                    where: {
                                        title: name
                                    },
                                    attributes: [
                                        "id", "title", "type", "date",
                                    ],
                                    include: [
                                        {
                                            model: Party,
                                            as: 'party'
                                        }
                                    ]

                                }).then(event => {
                                    logging.LOG(__filename, 37, "Event " + event)
                                    if (event !== null) {
                                        event.type = "Parliamentary"
                                        event.dataValues.candidates = [];
                                        event.dataValues.questions = [];
                                        event.dataValues.parties = event.dataValues.party;
                                        delete event.dataValues.party;
                                        serverMQTT.client.publish('api/mqtt/vote', JSON.stringify(event), function () {
                                            logging.LOG(__filename, 27, "Message is published");
                                            // client.end(); // Close the connection when published
                                        });
                                        event.dataValues.parties.forEach(element => {
                                            const result = Party.destroy({
                                                where:
                                                {
                                                    eventId: event.id
                                                }
                                            })
                                        });
                                        Event.destroy({
                                            where:
                                            {
                                                title: name
                                            }
                                        })
                                        res.status(200).send("Deleted");
                                    } else {
                                        res.status(400).send("Event Doesn't Exist");
                                    }

                                });
                                break;
                            }
                        case "referendum":
                            {
                                Event.findOne({
                                    where: {
                                        title: name
                                    },
                                    attributes: [
                                        "id", "title", "type", "date",
                                    ],
                                    include: [
                                        {
                                            model: Referendum,
                                            as: 'referendum'
                                        }
                                    ]

                                }).then(event => {
                                    logging.LOG(__filename, 37, "Event " + JSON.stringify(event.dataValues))
                                    if (event !== null) {
                                        event.type = "Referendum"
                                        event.dataValues.questions = event.dataValues.referendum;
                                        delete event.referendum;
                                        event.dataValues.candidates = [];
                                        event.dataValues.parties = [];
                                        serverMQTT.client.publish('api/mqtt/vote', JSON.stringify(event), function () {
                                            logging.LOG(__filename, 27, "Message is published");
                                            // client.end(); // Close the connection when published
                                            event.dataValues.questions.forEach(element => {
                                                const result = Referendum.destroy({
                                                    where:
                                                    {
                                                        eventId: event.id
                                                    }
                                                })
                                            });
                                            Event.destroy({
                                                where:
                                                {
                                                    title: name
                                                }
                                            })
                                            res.status(200).send("Deleted");
                                        });
                                    } else {
                                        res.status(400).send("Event Doesn't Exist");
                                    }

                                });
                                break;
                            }

                        default:
                            res.status(400).send("Requested event has unknown type");
                            break;
                    }

                }
                else
                {
                    res.status(200).send("Event is not in progress");
                }

            })





        }
    } catch (error) {
        res.status(400).send(error);
    }




}

const addEventWithAssociates = async (req, res) => {
    if ("type" in req.body) {
        const type = req.body.type;
        const { title, candidates, parties, questions } = req.body
        switch (type) {
            case "Presidentials" || "presidential": {
                console.log("presidential request")
                const exists = await Event.findOne({
                    where:
                    {
                        title
                    }
                })
                if (exists == null) {
                    const event = await Event.create({
                        title,
                        type: "presidential",
                        date: "maine sau poimaine"
                    });
                    candidates.forEach(async candidate => {
                        candidate = await Candidate.create({
                            name: candidate.name,
                            face: candidate.face,
                            description: candidate.description,
                            party: candidate.party,
                            votesIn: 0,
                            votesOut: 0,
                            EventId: event.id
                        })
                    });
                    res.status(200).send("Event Added!");
                }
                else
                    res.status(200).send("Event Aleady in database");

                break;
            }
            case "Parliamentary" || "parliamentary": {
                console.log("parliamentary request")
                const exists = await Event.findOne({
                    where:
                    {
                        title
                    }
                })
                if (exists == null) {
                    const event = await Event.create({
                        title,
                        type: "parliamentary",
                        date: "maine sau poimaine"
                    });
                    parties.forEach(async party => {
                        party = await Party.create({
                            name: party.name,
                            logo: party.logo,
                            description: party.description,
                            votesIn: 0,
                            votesOut: 0,
                            EventId: event.id
                        })
                    });
                    res.status(200).send("Event Added!");
                }
                else
                    res.status(200).send("Event Aleady in database");
                break;
            }
            case "Referendum" || "referendum": {
                console.log("referendum request")
                const exists = await Event.findOne({
                    where:
                    {
                        title
                    }
                })
                if (exists == null) {
                    const event = await Event.create({
                        title,
                        type: 'referendum',
                        date: "maine sau poimaine"
                    });
                    questions.forEach(async question => {
                        question = await Referendum.create({
                            name: "numeTest",
                            question: question.question,
                            votes_yes: 0,
                            votes_no: 0,
                            EventId: event.id
                        })
                    });
                    res.status(200).send("Event Added!");
                }
                else
                    res.status(200).send("Event Aleady in database");
                break;
            }



        }


    } else {
        res.status(400).send("Request missing required properties");
    }

}

// const reg = async (req, res) => {
// try {
//     console.log(req.body);
//     const {
//       firstName,
//       lastName,
//       email,
//       pwd,
//       cnp,
//       voted_events
//     } = req.body;

//     const newEvent = await Event.create({
//       firstName,
//       lastName,
//       email,
//       pwd,
//       cnp,
//       voted_events

//     });
//     res.status(200).send("register successful");

// } catch (err) {
//     res.status(400).json({
//       error: err
//     });
// }


// }


module.exports = {
    '/getEvent': {

        get: {
            action: getEvent,
            level: 'public'
        }
    },
    '/deleteEventWithAssociates': {
        post: {
            action: deleteEventWithAssociates,
            level: 'public'
        }
    },
    '/getAllEvents': {
        get: {
            action: getAllEvents,
            level: 'public'
        }
    },
    '/getEventWithAssociates': {
        get: {
            action: getEventWithAssociates,
            level: 'public'
        }
    },

    '/getAllEventsWithAssociates': {
        post: {
            action: getAllEventsWithAssociates,
            level: 'public'
        }
    },

    '/addEventWithAssociates':
    {
        post: {
            action: addEventWithAssociates,
            level: 'public'
        }
    }
    // '/register': {
    // post: {
    //     action: reg,
    //     level: 'public'
    // },
    // },
    // '/profile/:id': {
    // get: {
    //     action: findEvent,
    //     level: 'public'
    // }
    // }
}
