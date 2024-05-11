const express = require("express");
const hbs = require("hbs");
const path = require("path");
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
const request = require("request");
const cheerio = require("cheerio");

const fs = require("fs");
const countries = JSON.parse(fs.readFileSync("./countries.json", "utf8"));
const API_KEY = require("./api_key.js");

const wiki_URL = "https://pt.wikipedia.org/wiki/";

const app = new express();

app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/public/views"));

app.get("/", async (req, res) => {
  let country_name = "";
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
    const result = await chat.sendMessage(`Escreva uma breve curiosidade sobre ${page_content}`);
    // Remove os caracteres # e *
    let summaryTextWithoutMarkups = result.response.text().replace(/[#*]/g, "");

    // Remove quebras de linha duplicadas
    summaryTextWithoutMarkups = summaryTextWithoutMarkups.replace(/\n\s*\n/g, "\n\n");

    return summaryTextWithoutMarkups;
  }
  async function generateHint(country_name) {
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
    const result = await chat.sendMessage(`Escreva uma dica em uma frase sobre ${country_name}, mas que não contenha a palavra ${country_name}`);
    // Remove os caracteres # e *
    let hintTextWithoutMarkups = result.response.text().replace(/[#*]/g, "");

    // Remove quebras de linha duplicadas
    hintTextWithoutMarkups = hintTextWithoutMarkups.replace(/\n\s*\n/g, "\n\n");

    return hintTextWithoutMarkups;
  }
  async function run() {
    const random_index = Math.floor(Math.random() * countries.length);
    country_name = `${countries[random_index].nome}`;
    const countrySG = countries[random_index].sigla2;
    const imgURL = `https://static.significados.com.br/flags/${countrySG.toLowerCase()}.svg`;
    try {
      const page_content = await getWikiContent(country_name);
      const summary = await generateSummary(page_content);
      const hint = await generateHint(country_name);
      res.render("index.hbs", {
        country: country_name,
        summary: summary,
        hint: hint,
        url: imgURL,
      });
    } catch (error) {
      console.error("Erro:", error);
      // Lidar com o erro, como renderizar uma página de erro
      res.render("error.hbs", { error: error });
    }
  }

  // Chamar a função run
  await run();
});

app.listen(3000, () => {
  console.log("Server running on 3000");
});
