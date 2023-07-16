import { Request, Response } from "express";
import puppeteer, { Page } from "puppeteer";

export const getScore = async (req: Request, res: Response) => {
  console.log(`getScore start time ${new Date().toISOString()}`);

  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto("https://sport.trueid.net/premier-league/tables");

    const response: any = [];

    for (let i = 2; i < 22; i++) {
      var team = await page.waitForSelector(
        `#__next > main > div.sc-aXZVg.korseV.shelfContent > div > div > div > ul > div:nth-child(${i}) > div > div.col-5.team-name.col-team-name > div > div.text-team-name.truncate`
      );
      var teamName = await page.evaluate(
        (element) => element?.textContent,
        team
      );
      var pi = await page.waitForSelector(
        `#__next > main > div.sc-aXZVg.fyChqS.tablescoresMobile > div > ul > div:nth-child(${i}) > div > div:nth-child(5)`
      );
      var scorePI = await page.evaluate((element) => element?.textContent, pi);

      var Win = await page.waitForSelector(
        `#__next > main > div.sc-aXZVg.fyChqS.tablescoresMobile > div > ul > div:nth-child(${i}) > div > div:nth-child(6)`
      );
      var scoreWin = await page.evaluate(
        (element) => element?.textContent,
        Win
      );

      var Draw = await page.waitForSelector(
        `#__next > main > div.sc-aXZVg.fyChqS.tablescoresMobile > div > ul > div:nth-child(${i}) > div > div:nth-child(7)`
      );
      var scoreDraw = await page.evaluate(
        (element) => element?.textContent,
        Draw
      );

      var Lose = await page.waitForSelector(
        `#__next > main > div.sc-aXZVg.fyChqS.tablescoresMobile > div > ul > div:nth-child(${i}) > div > div:nth-child(8)`
      );
      var scoreLose = await page.evaluate(
        (element) => element?.textContent,
        Lose
      );

      var Gd = await page.waitForSelector(
        `#__next > main > div.sc-aXZVg.fyChqS.tablescoresMobile > div > ul > div:nth-child(${i}) > div > div.col-1.fixed-margin.text-point`
      );
      var scoreGd = await page.evaluate((element) => element?.textContent, Gd);

      var pts = await page.waitForSelector(
        `#__next > main > div.sc-aXZVg.fyChqS.tablescoresMobile > div > ul > div:nth-child(${i}) > div > div.col-1.fixed-margin.text-point`
      );
      var scorePts = await page.evaluate(
        (element) => element?.textContent,
        pts
      );

      response.push({
        team: teamName,
        pi: scorePI,
        w: scoreWin,
        d: scoreDraw,
        l: scoreLose,
        gd: scoreGd,
        pts: scorePts,
      });
    }
    browser.close();

    return res.status(200).json({
      status: {
        code: 200,
        message: "success",
        description: "get all account success",
      },
      data: response,
    });
  } catch (e: any) {
    return res.status(400).json({
      status: {
        code: 400,
        message: e,
        description: "Bad Request",
      },
      data: null,
    });
  }
};
