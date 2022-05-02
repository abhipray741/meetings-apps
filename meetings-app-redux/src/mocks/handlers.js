import { rest } from 'msw';

const handlers = [
    rest.get( 'https://mymeetingsapp.herokuapp.com/api/calendar', (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    "startTime": {
                        "hours": 6,
                        "minutes": 0
                    },
                    "endTime": {
                        "hours": 7,
                        "minutes": 0
                    },
                    "_id": "6203b5476b8f5c0015bbdf4b",
                    "name": "Meetings App data",
                    "description": "test run",
                    "date": "2022-02-14T00:00:00.000Z",
                    "attendees": [
                        {
                            "userId": "60a5fa202e96ae00151a1439",
                            "email": "john.doe@example.com"
                        },
                        {
                            "userId": "62034dc6531c6d0015c6b102",
                            "email": "jatin@example.com"
                        }
                    ],
                },
                {
                    "startTime": {
                        "hours": 9,
                        "minutes": 0
                    },
                    "endTime": {
                        "hours": 10,
                        "minutes": 0
                    },
                    "_id": "6203b55f6b8f5c0015bbdf4d",
                    "name": "Meetings App",
                    "description": "test run1",
                    "date": "2022-02-14T00:00:00.000Z",
                    "attendees": [
                        {
                            "userId": "60a5fa5c2e96ae00151a143a",
                            "email": "jane.doe@example.com"
                        },
                        
                    ],
                }
            ])
        );
    }),
    rest.post( 'https://mymeetingsapp.herokuapp.com/api/meetings', (req, res, ctx) => {
        return res(
            ctx.json({
                "startTime": {
                    "hours": 6,
                    "minutes": 0
                },
                "endTime": {
                    "hours": 7,
                    "minutes": 0
                },
                "_id": "6203b5476b8f5c0015bbdf4b",
                "name": "Meetings App data",
                "description": "test run",
                "date": "2022-02-14T00:00:00.000Z",
                "attendees": [
                    {
                        "userId": "60a5fa202e96ae00151a1439",
                        "email": "john.doe@example.com"
                    },
                    {
                        "userId": "62034dc6531c6d0015c6b102",
                        "email": "jatin@example.com"
                    }
                ],
            })
        )
    }),
    rest.get( 'https://mymeetingsapp.herokuapp.com/api/meetings?period=all&search=', (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    "startTime": {
                        "hours": 6,
                        "minutes": 0
                    },
                    "endTime": {
                        "hours": 7,
                        "minutes": 0
                    },
                    "_id": "6203b5476b8f5c0015bbdf4b",
                    "name": "Meetings App data",
                    "description": "test run",
                    "date": "2022-02-14T00:00:00.000Z",
                    "attendees": [
                        {
                            "userId": "60a5fa202e96ae00151a1439",
                            "email": "john.doe@example.com"
                        },
                        {
                            "userId": "62034dc6531c6d0015c6b102",
                            "email": "shubhkhanna@sapient.com"
                        }
                    ],
                },
                {
                    "startTime": {
                        "hours": 9,
                        "minutes": 0
                    },
                    "endTime": {
                        "hours": 10,
                        "minutes": 0
                    },
                    "_id": "6203b55f6b8f5c0015bbdf4d",
                    "name": "Final Demo",
                    "description": "test run1",
                    "date": "2022-02-14T00:00:00.000Z",
                    "attendees": [
                        {
                            "userId": "60a5fa5c2e96ae00151a143a",
                            "email": "jane.doe@example.com"
                        },
                        {
                            "userId": "62034dc6531c6d0015c6b102",
                            "email": "shubhkhanna@sapient.com"
                        }
                    ],
                }
            ])
        );
    }),
    rest.patch( `https://mymeetingsapp.herokuapp.com/api/meetings/6203b5476b8f5c0015bbdf4b?action=remove_attendee`, ( req, res, ctx ) => {
        return res(
            ctx.json( {
                "startTime": {
                    "hours": 6,
                    "minutes": 0
                },
                "endTime": {
                    "hours": 7,
                    "minutes": 0
                },
                "_id": "6203b5476b8f5c0015bbdf4b",
                "name": "Meetings App data",
                "description": "test run",
                "date": "2022-02-14T00:00:00.000Z",
                "attendees": [
                    {
                        "userId": "60a5fa202e96ae00151a1439",
                        "email": "john.doe@example.com"
                    },
                    {
                        "userId": "62034dc6531c6d0015c6b102",
                        "email": "shubhkhanna@sapient.com"
                    }
                ],
            } )
        );
    }),
    rest.get(
        `https://mymeetingsapp.herokuapp.com/api/teams`,
        (req, res, ctx) => {
            return res(
                ctx.json([
                    {
                        _id: "6215c873199e4b0015be1f38",
                        name: "team",
                        shortName: "agile",
                        description:
                            "Team spreading awareness about Agile practices at Zwiggy",
                        members: [
                            {
                                userId: 123,
                                email: "john.doe@example.com",
                            },
                            {
                                userId: 456,
                                email: "jane.doe@example.com",
                            },
                        ],
                    },
                    {
                        _id: "6215c873199e4b0015be1f44",
                        name: "Code Crew",
                        shortName: "group1",
                        description: "Final Demo",
                        members: [
                            {
                                userId: 123,
                                email: "johndoe@sapient.com",
                            },
                            {
                                userId: 456,
                                email: "janedoe@sapient.com",
                            },
                        ],
                    },
                ])
            );
        }
    ),
    rest.patch( `https://mymeetingsapp.herokuapp.com/api/teams/6215c873199e4b0015be1f38?action=remove_member`, ( req, res, ctx ) => {
        return res(
            ctx.json(  {
                "_id": "6215c873199e4b0015be1f38",
                "name": "W3 Team",
                "shortName": "W3",
                "description": "Team spreading awareness about W3 practices at Somato",
                "members": [
                    {
                        "userId": "620351f3531c6d0015c6b10b",
                        "email": "grp4@example.com"
                    },
                    {
                        "userId": "61fd0910a846e70015dfe0b1",
                        "email": "puranik100@example.com"
                    },
                    {
                        "userId": "60a5fa202e96ae00151a1439",
                        "email": "john.doe@example.com"
                    }
                ],
                "__v": 0
            })
        );
    }),
    rest.get( `https://mymeetingsapp.herokuapp.com/api/users`, ( req, res, ctx ) => {
        return res(
            ctx.json( 
            
                [
                    {
                        "_id": "61c610646d5985001505d9f7",
                        "name": "frank",
                        "email": "12@gmail.com",
                        "__v": 0
                    },
                    {
                        "_id": "62048cd385a9850015452df5",
                        "name": "Abh ffff",
                        "email": "A@gmail.com",
                        "__v": 0
                    },
                    {
                        "_id": "62048b5d85a9850015452de1",
                        "name": "Abhi shek",
                        "email": "Abh4454@gmail.com",
                        "__v": 0
                    }
                ]
            )
        );
    })
];

export default handlers;