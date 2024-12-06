import { Request, Response } from "express";
import puppeteer, { Page } from "puppeteer";

export const getScore = async (req: Request, res: Response) => {
  console.log(`getScore start time ${new Date().toISOString()}`);

  const url =
    "https://shopee.co.th/product/569947420/27769670284?d_id=ff462&uls_trackid=51e3a6v9000p&utm_content=2ZZ871dT3FpH3YubTnNsDpu5Jh6P";

  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(url);

    const response: any = [];

    var stock = await page.waitForSelector(
      `#sll2-normal-pdp-main > div > div.KrtGbA > div > div.container > section.flex.card.jNRWxO > section._OguPS > div.flex.flex-column > div.TMw1ot > div > div.kkBEei`
    );
    var stockValue = await page.evaluate(
      (element) => element?.textContent,
      stock
    );

    response.push({
      stock: stockValue,
    });
    browser.close();

    return res.status(200).json({
      status: {
        code: 200,
        message: "success",
        description: "get stock status success",
      },
      data: response,
    });
  } catch (e: any) {
    return res.status(400).json({
      status: {
        code: 400,
        message: e.message,
        description: "Bad Request",
        preview: url,
      },
      data: null,
    });
  }
};
