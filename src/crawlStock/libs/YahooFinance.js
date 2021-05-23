const puppeteer = require('puppeteer');

const PUPPETEER_OPTIONS = {
    headless: false,
    args: [
    ],
};

class YahooFinance {
    stockCode;

    /**
     * Puppeteer browser.
     * @type {puppeteer.Browser}
     */
    browser;

    constructor(stockCode) {
        this.stockCode = stockCode;
    }

    /**
     * Create new browser if not opened.
     */
    async openBrowser() {
        if (!this.browser) {
            this.browser = await puppeteer.launch(PUPPETEER_OPTIONS);
        }
    }

    /**
     * Close browser.
     */
    async closeBrowser() {
        // await this.browser.close();
    }

    async crawl() {
        this.crawlFundamental();
    }

    async crawlFundamental() {
        const page = await this.browser.newPage();

        const url = `https://profile.yahoo.co.jp/fundamental/${this.stockCode}`;
        await page.goto(url);

        const classTitle = '.pro_title2';
        await page.waitForSelector(classTitle); // Text of 会社概要
        var parentElm = await page.$(classTitle);
        var data = await (await parentElm.getProperty('textContent')).jsonValue();

        console.log("* " + data);

        // await page.close();
    }
}

module.exports = YahooFinance;