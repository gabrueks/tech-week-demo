import express from "express";
import twilio from "twilio";
import sendGPTMessage from "./sendGPTMessage.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/message", async (req, res) => {
    console.log(req.body.Body)
    const response = await sendGPTMessage(req.body.Body);
    const twilioMessagingInstance = new twilio.twiml.MessagingResponse();
    twilioMessagingInstance.message(response.choices[0].message.content);
    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twilioMessagingInstance.toString());
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
