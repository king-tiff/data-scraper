# YouTube and Medium Data Scraper 🚀  

A powerful data scraping tool designed to extract information from **Medium articles** and **YouTube videos**. The goal of this project is to collect, clean, and prepare data for fine-tuning AI models, particularly OpenAI GPT models.  

---

## Features  
- **Scrape Medium Articles**: Extract titles, links, and metadata from Medium user profiles.  
- **Scrape YouTube Videos**: Extract video details and transcribe video content using automated tools.  
- **Data Cleaning**: Automatically clean, deduplicate, and format data for further processing.  
- **Fine-Tuning Prep**: Formats data into `JSONL` files compatible with OpenAI fine-tuning requirements.  
- **Automation**: Scripts combine multiple sources of data into one cleaned, structured dataset.

---

## Installation  

### Prerequisites  
1. Node.js (for YouTube scraping with the YouTube Data API)  
2. Python (for audio transcription using Whisper)  
3. API Key for the **YouTube Data API v3**  
4. Tools like `yt-dlp` for downloading captions and audio  

### Clone the Repository  
```bash
git clone https://github.com/king-tiff/data-scraper.git
cd data-scraper
```
### Install Dependencies

```
npm install
```
### Usage
Scrape Medium Articles
  1. Update the MEDIUM_USER_URL in the General scraper script.
  2. Run the scraper:

 ```
node src/scrapers/generalScraper.js
 ```
3. Clean and deduplicate data:

```
node cleanData.js
```
4. Convert the Cleaned Data into JSONL format
 
```
node fineTuningData.js
```

### Technologies Used

1. Node.js: For web scraping and YouTube Data API integration.
2. OpenAI GPT: Fine-tune AI models using prepared datasets.

### Contributing

Feel free to submit pull requests or open issues to improve this project!
