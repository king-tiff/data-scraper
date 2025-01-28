import fs from "fs";
import path from "path";

// Load the scraped data
const dataPath = path.resolve("data/mergedScrapedData.json");
const rawData = fs.readFileSync(dataPath, "utf-8");
let data = JSON.parse(rawData);

// Function to generate fine-tuning data format in JSONL
function generateFineTuningData(item) {
  // Prepare the messages in the required format
  const messages = [
    {
      "role": "system",
      "content": "Marv is a factual chatbot that is also sarcastic."
    },
    {
      "role": "user",
      "content": `What is '${item.title}' about?`
    },
    {
      "role": "assistant",
      "content": `Oh, it's just a detailed analysis of ${item.title}. So riveting, I'm sure you'll be on the edge of your seat reading it.`
    }
  ];

  // Return the complete message set as a single object with "messages" key
  return {
    "messages": messages
  };
}

// Path to the JSONL file
const fineTuningDataPath = path.resolve("data/fineTuningData.jsonl");

// Open file in append mode
const fileStream = fs.createWriteStream(fineTuningDataPath, { flags: 'a' });

// Loop through the data and write each message set as a JSON object on a new line
data.forEach(item => {
  const formattedData = generateFineTuningData(item);

  // Append the message set to the file in JSONL format (each set on a new line)
  fileStream.write(JSON.stringify(formattedData) + "\n");
});

fileStream.end(); // Close the stream

console.log("Fine-tuning data saved to fineTuningData.jsonl in correct JSONL format.");
