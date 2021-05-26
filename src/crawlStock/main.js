/**
 * This program receive a stock code, crawl and return data about the company.
 * To run this program, *puppeteer* and *minimist* are needed to be installed.
 * ```shell
 * npm i puppeteer
 * npm i minimist
 * ```
 *
 * Syntax:
 *   node main.js --stockCode=<stock code>
 */
const puppeteer = require('puppeteer');
const minimist = require('minimist');
const YahooFinance = require('./libs/YahooFinance');

const PUPPETEER_OPTIONS = {
    headless: false,
    args: [
    ],
};

let stockCode = minimist(process.argv.slice(2)).stockCode;

/**
 * Main function.
 */
const run = async (stockCode) => {
    try {
        var yahoo = new YahooFinance(stockCode);
        await yahoo.openBrowser();

        await yahoo.crawl();

        await yahoo.closeBrowser();
        console.log(JSON.stringify(yahoo.company));
    } catch (error) {
        console.log(error);
    }
};

run(stockCode);