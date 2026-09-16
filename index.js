require("dotenv").config();

const OpenAI = require("openai");
const readline = require("readline");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    rl.question("Customer: ", async (customerMessage) => {
        try {
            const response = await client.responses.create({
                model: "gpt-5.6-luna",

                instructions:
                    "You are a helpful customer support AI agent. " +
                    "Answer clearly and professionally. " +
                    "Be concise and helpful. " +
                    "If you do not know the answer, say that you do not have enough information.",

                input: customerMessage
            });

            console.log("\nAI Agent Response:\n");
            console.log(response.output_text);

        } catch (error) {
            console.error("\nError:", error.message);
        } finally {
            rl.close();
        }
    });
}

main();