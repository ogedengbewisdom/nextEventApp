import { MongoClient } from "mongodb";

const handler = async (req, res) => {

    const eventId = req.query.eventId;
    let client;
    try {
        client = await MongoClient.connect("mongodb+srv://onimisi:wisdom123456@cluster0.pheshy5.mongodb.net/?retryWrites=true&w=majority")
    } catch(error) {
        res.status(500).json({message: "Failed to connect to client"})
        return
    }
    
    if (req.method === "POST") {
        const email = req.body.email;
        const name = req.body.name;
        const text = req.body.text;

        if (!email || !email.includes("@") || !name || !name.trim() === "" || !text || !text.trim() === "") {
            res.status(422).json({message: "Invalid input"})
            return;
        }

        const newComment = {
            email,
            name,
            text,
            eventId
        }
        const db = client.db("event");
        const result = await db.collection("comment").insertOne(newComment)
    
        newComment.id = result.insertedId
        res.status(201).json({message: "Sucess", comment: newComment})
    }

    if(req.method === "GET") {
        const db = client.db("event")
        const documents =  await db.collection("comment").find({eventId}).sort({_id: -1}).toArray();
     
        res.status(201).json({message: "sucess", comment: documents})
    }

    client.close()
};

export default handler;