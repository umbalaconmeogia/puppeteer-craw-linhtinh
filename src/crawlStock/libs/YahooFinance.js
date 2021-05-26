const puppeteer = require('puppeteer');
const Company = require('./Company');

const PUPPETEER_OPTIONS = {
    headless: false,
    args: [
    ],
};

class YahooFinance {
    /**
     * type {Company}
     */
    company;

    /**
     * Puppeteer browser.
     * @type {puppeteer.Browser}
     */
    browser;

    constructor(stockCode) {
        this.company = new Company();
        this.company.stockCode = stockCode;
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
        await this.browser.close();
    }

    async crawl() {
        await this.crawlFundamental();
    }

    /**
     * 会社のファンダメンタル情報を取得して、このオブジェクトの変数に保管する。
     */
    async crawlFundamental() {
        const page = await this.browser.newPage();

        const url = `https://profile.yahoo.co.jp/fundamental/${this.company.stockCode}`;
        await page.goto(url);

        const classTitle = '.pro_title2';
        await page.waitForSelector(classTitle); // Text of 会社概要

        const crawled = await page.evaluate((classTitle) => {
            const table = document.querySelector(classTitle).parentNode.querySelector('table table');
            const trs = table.querySelectorAll('tr');
            console.log(trs);
            const getValues = {
                name: document.querySelector('.selectFinTitle h1').textContent,
                feature: trs[0].querySelector('td:nth-child(2)').textContent,
                consolidatedBusinesses: trs[1].querySelector('td:nth-child(2)').textContent,
                address: trs[2].querySelector('td:nth-child(2)').textContent,
                station: trs[3].querySelector('td:nth-child(2)').textContent,
                tel: trs[4].querySelector('td:nth-child(2)').textContent,
                industrialClassification: trs[5].querySelector('td:nth-child(2)').textContent,
                nameEnglish: trs[6].querySelector('td:nth-child(2)').textContent,
                ceo: trs[7].querySelector('td:nth-child(2)').textContent,
                foundationDate: trs[8].querySelector('td:nth-child(2)').textContent,
                marketCode: trs[9].querySelector('td:nth-child(2)').textContent,
                listingDate: trs[10].querySelector('td:nth-child(2)').textContent,
                settlement: trs[11].querySelector('td:nth-child(2)').textContent,
                shareUnitNumber: trs[12].querySelector('td:nth-child(2)').textContent,
                employeeNumber: trs[13].querySelector('td:nth-child(2)').textContent,
                employeeNumberGroup: trs[13].querySelector('td:nth-child(4)').textContent,
                averageAge: trs[14].querySelector('td:nth-child(2)').textContent,
                AverageAnnualIncome: trs[14].querySelector('td:nth-child(4)').textContent,
            }
            return getValues;
        }, classTitle);

        Object.assign(this.company, crawled);

        await page.close();
    }
}

module.exports = YahooFinance;