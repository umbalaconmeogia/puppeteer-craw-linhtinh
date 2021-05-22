/**
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
    var text = await page.evaluate(() => {
        // Get .main .box
        var textBlock = document.querySelector('.main').querySelector('.box');
        var text = textBlock.textContent;

        return text;
    });
    return text.trim();
};

/**
 * Load and save one item.
 * @param {puppeteer.Browser} browser
 * @param {int} index
 */
const getAndSaveContent = async (browser, index) => {
    const url = `http://workprint.biz/bungo_ohno_rinrihoujinkai/${index}.html`;
    const saveFile = `download/${index}.txt`;

    var page = await browser.newPage();
    await page.goto(url);

    var text = await getTextContent(page);
    await page.close();

    // Write content to file asynchronously.
    fs.writeFile(saveFile, text, (err, data) => {
         if (err) throw new Error(err);
    });
};

/**
 * 17箇条取得
 * @param {puppeteer.Browser} browser
 */
const load17Items = async (browser) => {
    // Create array of integer from 1..17
    var array17 = Array(17).fill().map((x, i) => i + 1); // Another way is array17 = Array.from(Array(17), (x, i) => i + 1);

    // Open html files to get content and save asynchronously.
    await Promise.all(array17.map(number => getAndSaveContent(browser, number)));

    // For comparing: Run crawling synchronously.
    // for (let number = 1; number <= 17; number++) {
    //     await getAndSaveContent(browser, number)
    // }
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