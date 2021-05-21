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
    var title = 'aaa';
    var content = 'bbb';

    await page.evaluate((title, content) => {
        // Get .main .box
        var textBlock = document.querySelector('.main').querySelector('.box');
        // Get h2 as title
        title = textBlock.querySelector('h2').innerHTML;
        // Get all left as text.
        // Return object {title, content}
    }, title, content);
    console.log("Outside: " + title);
    var text = 'AAA';
    return text;
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

    await getTextContent(page)
        .then(text => console.log(text));

    // page.close();
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
        break;
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

        // browser.close();
    } catch (error) {
        console.log(error);
    }
};

run();