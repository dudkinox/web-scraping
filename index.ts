import puppeteer from "puppeteer";

async function scrape() {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();
  await page.goto("https://www.thesaurus.com/browse/smart");
  var element = await page.waitForSelector(
    "#root > div > main > div.HjmF_6uYqSRDdE7yX2Wy.ytunuYhmdZru4dW63UJL > section > section.wjLcgFJpqs9M6QJsPf5v > section.q7ELwPUtygkuxUXXOE9t.ULFYcLlui2SL1DTZuWLn > ul > li:nth-child(1) > a"
  );
  var text = await page.evaluate((element) => element?.textContent, element);
  console.log(text);
  browser.close();
}
scrape();
