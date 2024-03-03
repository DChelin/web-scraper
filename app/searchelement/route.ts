import{ NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET(request: Request){
    const { searchParams } = new URL (request.url);
    const url = searchParams.get("url");

    if (!url){
        return NextResponse.json(
            { error: "URL parameter is required" },
            { status: 400 }
        );
    }
    let browser;
    try {
        browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto("https://developer.chrome.com/");
        await page.setViewport({ width: 1080, height: 1024 });
        await page.type(".search-box__input", "automate beyond recorder");

        const searchResultSelector = ".search-box__link";
        await page.waitForSelector(searchResultSelector);
        await page.click(searchResultSelector);

        const textSelector = await page.waitForSelector(
            "text/Customise and automate"
        );

        const fullTitle = await textSelector?.evaluate((el) => el.textContent);

        console.log('The title of this blog post is "%s".', fullTitle);
    } catch (error) {
        return NextResponse.json(
            { error: "Something went wrong!"},
            { status: 200 }
        );
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}   