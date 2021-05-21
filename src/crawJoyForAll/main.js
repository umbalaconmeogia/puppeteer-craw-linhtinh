/**
 * TODO: Run crawling pages asynchronously.
 *
 * Syntax:
 *   node main.js
 */
const puppeteer = require('puppeteer');
const fs = require('fs');

const PUPPETEER_OPTIONS = {
    headless: false,
    args: [
    ],
};

const getTextContent = async (page) => {
    return 'AAAA';
};

/**
 * Load and save one item.
 * @param {puppeteer.Browser} browser
 * @param {int} index
 */
const loadAndSave = async (browser, index) => {
    const url = `http://workprint.biz/bungo_ohno_rinrihoujinkai/${index}.html`;
    const saveFile = `download/${index}.txt`;

    var page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector('body');

    getTextContent(page).then(text => fs.writeFileSync(saveFile, text));

    page.close();
};

/**
 * 17箇条取得
 * @param {puppeteer.Browser} browser
 */
const load17Items = async (browser) => {
    // Create array of integer from 1..17
    // var array17 = Array(17).fill().map((x, i) => i + 1);
    // array17 = Array.from(Array(17), (x, i) => i + 1);

    for (let i = 1; i <= 17; i++) {
        await loadAndSave(browser, i);
    }
};

/**
 * Main function.
 */
const run = async () => {
    var browser;

    try {
        browser = await puppeteer.launch(PUPPETEER_OPTIONS);

        await load17Items(browser);

        browser.close();
    } catch (error) {
        console.log(error);
    }
};

run();