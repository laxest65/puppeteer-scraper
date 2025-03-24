const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/scrape", async (req, res) => {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                `--proxy-server=http://geonode_7z69SzKcM9-type-residential:17bb133b-5000-4abc-8c30-24692e159402@us.proxy.geonode.io:9000`
            ]
        });

        const page = await browser.newPage();
        await page.setUserAgent(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
        );

        await page.goto("https://www.truepeoplesearch.com/find/person/px2n0ul090l08r6u4r992", {
            waitUntil: "networkidle2"
        });

        const html = await page.content();
        await browser.close();

        res.send(html);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
