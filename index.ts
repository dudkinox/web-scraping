import puppeteer from "puppeteer";
import { url } from "./config";

async function scrape() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(url);
  for (let i = 2; i < 22; i++) {
    var element = await page.waitForSelector(
      `#__next > main > div.sc-aXZVg.korseV.shelfContent > div > div > div > ul > div:nth-child(${i}) > div > div.col-5.team-name.col-team-name > div > div.text-team-name.truncate`
    );
    var text = await page.evaluate((element) => element?.textContent, element);
    console.log(text);
  }
  browser.close();
}
scrape();
