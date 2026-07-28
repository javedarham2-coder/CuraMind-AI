"""Take screenshots of all CuraMind pages."""
import asyncio
import os
from playwright.async_api import async_playwright

OUT = "/home/user/curamind/screenshots"
os.makedirs(OUT, exist_ok=True)

PAGES = [
    ("01-landing.png", "http://localhost:5173/", 1.2),
    ("02-assessment.png", "http://localhost:5173/assessment", 0.5),
    ("03-analysis.png", "http://localhost:5173/analysis", 0.3),
    ("04-dashboard.png", "http://localhost:5173/dashboard", 0.4),
    ("05-report.png", "http://localhost:5173/report", 0.4),
    ("06-signin.png", "http://localhost:5173/signin", 0.4),
]

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=2)
        page = await ctx.new_page()
        for name, url, wait in PAGES:
            print(f"→ {name} {url}")
            await page.goto(url, wait_until="networkidle")
            await page.wait_for_timeout(int(wait * 1000))
            await page.screenshot(path=os.path.join(OUT, name), full_page=True)
        # Mobile shot
        ctx2 = await browser.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2)
        page2 = await ctx2.new_page()
        await page2.goto("http://localhost:5173/", wait_until="networkidle")
        await page2.wait_for_timeout(1200)
        await page2.screenshot(path=os.path.join(OUT, "07-mobile-landing.png"), full_page=True)
        await browser.close()
    print("done")

asyncio.run(main())
