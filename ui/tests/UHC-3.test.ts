import { test, expect } from '@Test';

test.describe('UHC-0 (test ID)', () => {
    test('Check search results on category page (test title)', async ({
        browser,
        page,
        baseURL,
    }) => {
        await page.goto(baseURL as string, { waitUntil: 'domcontentloaded' });

        const myAccDiv = page.locator('//*[@id="react-root"]/div/header/div/div[1]/div/div/div[2]');
        await myAccDiv.hover();

        const logInBtn = page.locator(
            '//*[@id="react-root"]/div/header/div/div[1]/div/div/div[2]/div[2]/div/ul/li[1]/button'
        );

        await logInBtn.click();

        expect(await page.locator('/html/body/div[6]').isVisible()).toBe(true);

        const createAccBtn = page.locator('/html/body/div[6]/div/div/div/section[2]/div/button');

        await createAccBtn.click();

        const pageTitle = await page.title();

        expect(pageTitle).toStrictEqual('UHC. United Healthcare.');

        const inputSearch = page.locator('//input[@aria-label="Search"]');
        await inputSearch.type('ray ban');

        // await page.locator('//ul[contains(@class, "searchResults__list")]').waitFor();
        expect(
            await page.locator('//ul[contains(@class, "searchResults__list")]').isVisible()
        ).toBe(true);

        const inputSearchButton = page.locator('//button[@aria-label="Submit Search"]');
        await inputSearchButton.click();

        const subtitleSearchResultLocator = page.locator('//p[contains(., "Search results for:")]');
        const subtitleSearchResultText = await subtitleSearchResultLocator.textContent();

        expect(subtitleSearchResultText).toStrictEqual('Search results for: ray ban');
    });
});
