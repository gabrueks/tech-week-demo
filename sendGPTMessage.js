import axios from "axios";

async function sendGPTMessage(message) {
    try {
        const gptResponse = await axios.post("https://api.openai.com/v1/chat/completions", {
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": message}]
        }, {
            headers: {
                "Authorization": `Bearer ${process.env.CHAT_GPT_API_KEY}`
            }
        });
        return gptResponse.data;
    } catch (err) {
        console.log(err);
    }
}
export default sendGPTMessage;