/**
 * This program receive a stock code, crawl and return data about the company.
 * To run this program, *puppeteer* and *minimist* are needed to be installed.
 * ```shell
 * npm i puppeteer
 * npm i minimist
 * ```
 *
 * Syntax:
 *   node main.js
 */
const Amazon = require('./libs/Amazon');

/**
 * Main function.
 */
const run = async () => {
    try {
        var amazon = new Amazon();
        await amazon.openBrowser();

        await amazon.crawl();

        await amazon.closeBrowser();
    } catch (error) {
        console.log(error);
    }
};

run();