import {MongoClient} from "mongodb";

const handler = async (req, res) => {

    if (req.method === "POST") {
        const email = req.body.email;

        if (!email || !email.includes("@")) {
            res.status(422).json({message: "Invalid email address"})
            return;
        }

        const client = await MongoClient.connect("mongodb+srv://onimisi:wisdom123456@cluster0.pheshy5.mongodb.net/event?retryWrites=true&w=majority")
        const db = client.db();
        await db.collection("newsletter").insertOne({email: email})
        client.close()
        res.status(201).json({message: "Signed up!"})
    }
};

export default handler;