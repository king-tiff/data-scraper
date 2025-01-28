import fs from "fs";
import path from "path";

// Function to read all files in the folder and combine them
function loadAllData(folderPath) {
  const allData = [];

  const files = fs.readdirSync(folderPath);
  files.forEach(file => {
    const filePath = path.join(folderPath, file);
    if (file.endsWith(".json")) {
      const rawData = fs.readFileSync(filePath, "utf-8");
      allData.push(...JSON.parse(rawData)); // Merge data from each file
    }
  });

  return allData;
}

// Load all scraped data from the 'data' folder
const dataFolderPath = path.resolve("data");
let data = loadAllData(dataFolderPath);

// Clean up the data
const cleanedData = data.map(item => {
  // Trim whitespace and remove unwanted characters from the title
  const cleanTitle = item.title ? item.title.trim().replace(/[\n\r\t]+/g, " ").replace(/[^a-zA-Z0-9\s\.,!?]/g, "") : "";

  // Ensure the link is valid and clean any extra spaces
  const cleanLink = item.link ? item.link.trim() : "";

  // Example of handling incomplete data by setting default values
  return {
    title: cleanTitle || "No title available",
    link: cleanLink || "No link available",
  };
});

// Remove any items with missing essential information
const filteredData = cleanedData.filter(item => item.title !== "No title available" && item.link !== "No link available");

// Remove duplicates based on the link
const uniqueData = Array.from(new Set(filteredData.map(a => a.link)))
  .map(link => {
    return filteredData.find(a => a.link === link);
  });

// Optionally, if you want to deduplicate based on title instead:
const uniqueDataByTitle = Array.from(new Set(filteredData.map(a => a.title)))
  .map(title => {
    return filteredData.find(a => a.title === title);
  });

// Define the path to the file where the data will be saved
const outputPath = path.resolve("data/mergedScrapedData.json");

// Function to append data to an existing file
function appendDataToFile(filePath, newData) {
  let existingData = [];

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    const rawData = fs.readFileSync(filePath, "utf-8");
    existingData = JSON.parse(rawData);
  }

  // Append the new data to the existing data
  existingData.push(...newData);

  // Save back the combined data
  fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
  console.log(`Data has been appended to ${filePath}`);
}

// Append the unique data to the existing file
appendDataToFile(outputPath, uniqueData);

