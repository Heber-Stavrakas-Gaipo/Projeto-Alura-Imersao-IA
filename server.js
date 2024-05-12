// import necessary libraries
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
const request = require("request");
const cheerio = require("cheerio");
const bodyParser = require("body-parser");
const fs = require("fs");

// init app
const app = new express();

// configure middlewares
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/public/views"));
app.use(favicon(path.join(__dirname, "public", "icon", "favicon.ico")));

// load API Key and country data
const API_KEY = require("./api_key.js");
const countries = JSON.parse(fs.readFileSync("./countries.json", "utf8"));
const wiki_URL = "https://pt.wikipedia.org/wiki/";

/**
 * Express route handler for the home page.
 * Fetches a random country, fetches its Wikipedia content, generates a summary and hint using Generative AI,
 * and renders the home page with the fetched data.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {void}
 */
app.get("/", async (req, res) => {
  let country_name = "";
  /**
   * Fetches the Wikipedia content of a given country.
   *
   * @param {string} countryName - The name of the country.
   * @returns {Promise<string>} - A promise that resolves to the Wikipedia content of the country.
   */
  async function getWikiContent(countryName) {
    const treated_text = countryName.replace(/\([^)]+\)/g, "");
    let replacedSpaceText = treated_text.replace(/\s+/g, "_");
    if (replacedSpaceText.charAt(replacedSpaceText.length - 1) === "_") {
      replacedSpaceText = replacedSpaceText.substring(0, replacedSpaceText.length - 1);
    }
    const wikiURL = `${wiki_URL}${replacedSpaceText}`;
    return new Promise((resolve, reject) => {
      request(wikiURL, (error, response, html) => {
        if (!error && response.statusCode == 200) {
          const $ = cheerio.load(html);
          const page_content = $("div.mw-content-ltr p").text();
          resolve(page_content);
        } else {
          reject(console.error(error, response.statusCode));
        }
      });
    });
  }
  /**
   * Generates a summary of a given text using Generative AI.
   *
   * @param {string} page_content - The text to generate the summary from.
   * @returns {Promise<string>} - A promise that resolves to the generated summary.
   */
  async function generateSummary(page_content) {
    const MODEL_NAME = "gemini-1.5-pro-latest";
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const generationConfig = { temperature: 1, topK: 0, topP: 0.95, maxOutputTokens: 8192 };
    const safetySettings = [
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    ];
    const chat = model.startChat({ generationConfig, safetySettings });
    const result = await chat.sendMessage(`Escreva uma breve curiosidade sobre "${page_content}" apenas utilizando o conteúdo do texto. Adote um linguajar interessante e carismático.`);
    // Remove # and * from Markdown format
    let summaryTextWithoutMarkups = result.response.text().replace(/[#*]/g, "");

    // Remove double break lines
    summaryTextWithoutMarkups = summaryTextWithoutMarkups.replace(/\n\s*\n/g, "\n\n");

    return summaryTextWithoutMarkups;
  }
  /**
   * Generates a hint for a given country using Generative AI.
   *
   * @param {string} country_name - The name of the country.
   * @returns {Promise<string>} - A promise that resolves to the generated hint.
   */
  async function generateHint(country_name, page_content) {
    const MODEL_NAME = "gemini-1.5-pro-latest";
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const generationConfig = { temperature: 1, topK: 0, topP: 0.95, maxOutputTokens: 8192 };
    const safetySettings = [
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    ];
    const chat = model.startChat({ generationConfig, safetySettings });
    const result = await chat.sendMessage(
      `Escreva uma dica em uma frase sobre "${country_name}", mas que não contenha a palavra "${country_name}". Extraia essa informação do texto "${page_content}", sem incluir informações que não estejam presentes nele.`
    );
    // Remove # and * from Markdown format
    let hintTextWithoutMarkups = result.response.text().replace(/[#*]/g, "");

    // Remove double break lines
    hintTextWithoutMarkups = hintTextWithoutMarkups.replace(/\n\s*\n/g, "\n\n");

    return hintTextWithoutMarkups;
  }
  /**
   * The main function to run the application.
   * Fetches a random country, fetches its Wikipedia content, generates a summary and hint,
   * and renders the home page with the fetched data.
   *
   * @returns {Promise<void>} - A promise that resolves when the main function completes.
   */
  async function run() {
    const random_index = Math.floor(Math.random() * countries.length);
    country_name = `${countries[random_index].nome}`;
    const countrySG = countries[random_index].sigla2;
    const imgURL = `https://static.significados.com.br/flags/${countrySG.toLowerCase()}.svg`;
    try {
      const page_content = await getWikiContent(country_name);
      const summary = await generateSummary(page_content);
      const hint = await generateHint(country_name, page_content);
      // generate buttons
      let buttonCountries = [country_name];
      while (buttonCountries.length < 4) {
        let randomCountry = countries[Math.floor(Math.random() * countries.length)].nome;
        if (!buttonCountries.includes(randomCountry)) {
          buttonCountries.push(randomCountry);
        }
      }
      // sorting buttons
      for (let i = buttonCountries.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [buttonCountries[i], buttonCountries[j]] = [buttonCountries[j], buttonCountries[i]];
      }
      res.render("index.hbs", {
        country: country_name,
        summary: summary,
        hint: hint,
        url: imgURL,
        buttons: buttonCountries,
      });
    } catch (error) {
      console.error("Erro:", error);
      // render page when error is returned
      res.render("error.hbs", { error: error });
    }
  }

  // call the main function
  await run();
});

// start the server
app.listen(3000, () => {
  console.log("Server running on 3000");
});
