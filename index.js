const puppeteer = require("puppeteer");
const config = require('./config');

login();
(async function login() {
    try {
        var browser = await puppeteer.launch({
            args: [
                '--disable-gpu',
                '--disable-dev-shm-usage',
                '--disable-setuid-sandbox',
                '--no-first-run',
                '--no-sandbox',
                '--no-zygote',
                '--deterministic-fetch',
                '--disable-features=IsolateOrigins',
                '--disable-site-isolation-trials',
            ],
            defaultViewport: null,
        });
        var page = await browser.newPage();
        await page.setUserAgent(
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36 RuxitSynthetic/1.0 v3290252358115919606 t1210004724995914732 ath259cea6f altpriv cvcv=2 cexpw=1 smf=0'
        );

        await page.goto(config.WEB_URL, { waitUntil: 'networkidle2', timeout: 60000 });

        await page.type("**Paste email input field's JS Path here**", config.EMAIL);
        await page.type("**Paste password input field's JS Path here**", config.PASSWORD);

        await Promise.all([
            await page.click("**Paste signin button's JS Path here**"),
            page.waitForNavigation({ waitUntil: 'networkidle0' }),
        ]);

        //<------  Uncomment this code to made automated searches as well ------>

        // await page.goto('**Paste url for search page here**', { waitUntil: 'networkidle2', timeout: 60000 });
        // await page.type("**Paste search bar's JS Path here**", config.SEARCH_STRING)
        // await page.click('**Paste JS Path for search button here**');
        // await page.waitForNavigation();

    } catch (err) {
        console.log(err);
    }
    finally {
        // await browser.close()
    }
})();