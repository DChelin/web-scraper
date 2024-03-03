import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

    export async function POST(request: Request) {
        const {searchPrompt : userSearch} = await request.json();

        if(!userSearch) {
            return NextResponse.json("Please provide a search prompt");
        }

        let browser 

        try {
            browser = await puppeteer.launch({})
            const page = await browser.newPage();
            await page.goto("https://www.google.com");
        } catch (error) {

        }

        return NextResponse.json("Hello");
    }