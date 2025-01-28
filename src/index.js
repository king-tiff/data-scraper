import { scrapeGeneral } from "./scrapers/generalScraper.js";

async function main() {
  console.log("Starting scraping process...");

  // Call the general scraper
  await scrapeGeneral();

  console.log("Scraping completed!");
}

main();
