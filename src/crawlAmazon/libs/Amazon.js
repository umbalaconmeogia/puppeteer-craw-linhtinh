const puppeteer = require('puppeteer');

const PUPPETEER_OPTIONS = {
    headless: false,
    args: [
    ],
};

class Amazon {

    /**
     * Puppeteer browser.
     * @type {puppeteer.Browser}
     */
    browser;

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
        await this.crawlProductDetail();
    }

    /**
     * 会社のファンダメンタル情報を取得して、このオブジェクトの変数に保管する。
     */
    async crawlProductDetail() {
        const page = await this.browser.newPage();

        const url = `https://www.amazon.co.jp/%E3%83%87%E3%82%B9%E3%82%AF%E3%83%88%E3%83%83%E3%83%97PC-%E7%AC%AC10%E4%B8%96%E4%BB%A310510U-%E3%83%A1%E3%83%A2%E3%83%AADDR4-%E6%9C%89%E7%B7%9ALAN%E3%83%9D%E3%83%BC%E3%83%88-Bluetooth/dp/B08Y8VBRN3/ref=sr_1_10?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=PC&qid=1623012775&rnid=2321267051&s=computers&sr=1-10`;
        await page.goto(url);

        await page.waitForTimeout(5000);
        await page.waitForSelector('#productDetails_techSpec_section_1');

        const crawled = await page.evaluate(() => {
            const prodDetails = document.querySelector('#productDetails_techSpec_section_1');
            const value = prodDetails.textContent;
            return value;
        });
        console.log(crawled);

        await page.close();
    }

}

module.exports = Amazon;