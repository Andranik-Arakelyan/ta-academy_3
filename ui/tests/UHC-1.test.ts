import { test, expect } from '@Test';
import { generateRandomEmail } from 'helpers';

test.describe('UHC-1 (test ID)', () => {
    test('Registration new customer with valid data and checking user data reset after logout (test title)', async ({
        browser,
        page,
        baseURL,
    }) => {
        await page.goto(baseURL as string, { waitUntil: 'domcontentloaded' });

        const myAccDiv = page.locator(
            '//div[contains(@class, "myAccount__myAccountMenu___2mbVE")]'
        );
        await myAccDiv.hover();

        const logInBtn = page.locator(
            '//div[contains(@class, "topStripMenuDropdown__dropdownContent___3xHDa")]/ul/li[1]/button'
        );
        await logInBtn.click();

        expect(
            await page
                .locator(
                    '//div[contains(@class, "ReactModal__Content ReactModal__Content--after-open") and .//h2[contains(., "Access your vision benefits")]]'
                )
                .isVisible()
        ).toBe(true);

        const registerBtn = page.locator('//button[contains(., "Create UHCGlasses")]');
        await registerBtn.click();

        expect(
            await page
                .locator(
                    '//div[contains(@class, "ReactModal__Content ReactModal__Content--after-open") and .//h2[contains(., "No vision insurance? We got you!")]]'
                )
                .isVisible()
        ).toBe(true);

        const inputFirstName = page.locator("//input[@name='firstName']");
        await inputFirstName.type('Ivan');

        const inputLastName = page.locator("//input[@name='lastName']");
        await inputLastName.type('Ivanov');

        const inputEmail = page.locator("//input[@name='email']");
        await inputEmail.type('test654@test.com ');

        const inputPassword = page.locator("//input[@name='password']");
        await inputPassword.type('Test1234');

        const createAccBtn = page.locator('//button[contains(., "Create UHCGlasses.com Account")]');

        try {
            await createAccBtn.click();

            await page.waitForSelector('p.loginPopup__errorMessage___3O9-R', { timeout: 500 });

            const errorMessage = await page.textContent('p.loginPopup__errorMessage___3O9-R');

            if (errorMessage === 'This email is already used') {
                await inputEmail.fill('');
                const newEmail = generateRandomEmail();
                await inputEmail.type(newEmail);
                await createAccBtn.click();
            }
        } catch (error) {
            console.log('Valid email');
        }

        await expect(async () => {
            expect(
                await page
                    .locator(
                        '//div[contains(@class, "ReactModal__Content ReactModal__Content--after-open") and .//h2[contains(., "No vision insurance? We got you!")]]'
                    )
                    .isVisible()
            ).toBe(false);
            expect(
                await page.locator('//div[contains(@class, "rc-dialog welcomePopup")]').isVisible()
            ).toBe(true);
        }).toPass();

        await expect(async () => {
            const popUpTitle = page.locator('//h2[contains(., "Welcome")]');
            const popUpTitleText = await popUpTitle.textContent();
            expect(popUpTitleText).toStrictEqual('Welcome, Ivan');
        }).toPass();

        const popUpSubTitle = page.locator(
            '//p[contains(@class, "welcomePopup__subtitle___21xeJ")]'
        );
        const popUpSubTitleText = await popUpSubTitle.textContent();
        expect(popUpSubTitleText).toStrictEqual(
            'You can start enjoying everything we have to offer'
        );

        const closeWelcomePopUp = page.locator('//button[@aria-label="Close"]');
        await closeWelcomePopUp.click();

        expect(
            await page.locator('//div[contains(@class, "rc-dialog welcomePopup")]').isVisible()
        ).toBe(false);

        const greetingDiv = page.locator('//div[contains(@class, "myAccount__title___3VN4o")]');
        const greetingDivText = await greetingDiv.textContent();
        expect(greetingDivText).toStrictEqual('Hello, Ivan');

        const snackBarTitle = page.locator(
            '//header[contains(@class, "eligibilityWidget__header___2B89B")]/p'
        );
        const snackBarTitleText = await snackBarTitle.textContent();
        expect(snackBarTitleText).toStrictEqual('Hi Ivan');

        await myAccDiv.hover();
        const logOutBtn = page.locator(
            '//div[contains(@class, "topStripMenuDropdown__dropdownContent___3xHDa")]/ul/li[4]/button'
        );
        await logOutBtn.click();

        const logedOutGreeting = page.locator(
            '//div[contains(@class, "myAccount__title___3VN4o")]'
        );
        const logedOutGreetingText = await logedOutGreeting.textContent();
        expect(logedOutGreetingText).toStrictEqual('My Account');

        expect(
            await page
                .locator('//article[contains(@class, "eligibilityWidget__wrap___-14Is")]')
                .isVisible()
        ).toBe(false);
    });
});
