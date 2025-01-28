import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import fs from "fs";
import path from "path";

puppeteer.use(StealthPlugin());

export async function scrapeGeneral() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    const url = "https://example.com";

    // Set a user-agent
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36"
    );

    await page.goto(url, { waitUntil: "networkidle0" });

    // Take a screenshot for debugging
    await page.screenshot({ path: "debug-screenshot.png", fullPage: true });
    console.log("Screenshot taken. Check debug-screenshot.png.");

    // Wait for the selector
    await page.waitForSelector("a h3", { timeout: 60000 });

    // Extract titles and links
    const results = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll("a h3"));
      return elements.map((el) => ({
        title: el.innerText.trim(),
        link: el.closest("a")?.href,
      }));
    });

    // Create a filename with the current timestamp
    const timestamp = new Date().toISOString().replace(/[:.-]/g, "_"); // Format: 2025-01-27T10_30_00
    const dataPath = path.resolve(`data/scrapedData_${timestamp}.json`);

    // Function to save data to a new file
    function saveDataToFile(filePath, newData) {
      fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));  // Save data to the file
      console.log(`Data saved to ${filePath}`);
    }

    // Save the results to a new file with timestamp
    saveDataToFile(dataPath, results);
  } catch (error) {
    console.error("Error during scraping:", error.message);
  } finally {
    await browser.close();
  }
}
