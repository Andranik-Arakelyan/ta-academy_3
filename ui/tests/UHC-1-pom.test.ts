import { expect, test } from '@Test';
import { InputType } from '@Components/homePage/homePage/signUpModal';
import { generateRandomEmail } from 'helpers';
import { ActionType } from '@Components/homePage/homePage/header/topSide/actionsBar/myAccount/accDropdown';

test.describe('UHC-1-pom', () => {
    test('Registration ...', async ({ page, homePage, categoryPage }) => {
        const myAccount = homePage.Header.TopSide.ActionsBar.MyAccount;

        await test.step('Preconditions steps | e.g. Open Home page', async () => {
            await homePage.open();
        });
        ///////////////
        await test.step('test-step 1 | guarantee is visible', async () => {
            const guaranteeText = homePage.Header.TopSide.GuaranteeText;
            expect(await guaranteeText.isVisible()).toBe(true);
        });
        //////////////
        await test.step('Test-step 2 | open login modal', async () => {
            await myAccount.hoverAcc();
            const accDropdown = myAccount.AccDropdown;
            expect(await myAccount.AccDropdown.isVisible()).toBe(true);

            await accDropdown.clickToAction(ActionType.Login);

            expect(await homePage.LoginModal.isVisible()).toBe(true);
        });
        //////////////
        await test.step('Test-step 3 | open registration modal', async () => {
            await homePage.LoginModal.clickCreatebtn();

            await expect(async () => {
                expect(await homePage.LoginModal.isVisible()).toBe(false);
                expect(await homePage.SignUpModal.isVisible()).toBe(true);
            }).toPass();
        });
        ///////////////
        await test.step('Test-step 4 | fill out form and register', async () => {
            await homePage.SignUpModal.typeOnInput(InputType.Firstname, 'Ivan');
            await homePage.SignUpModal.typeOnInput(InputType.Lastname, 'Ivanov');
            await homePage.SignUpModal.typeOnInput(InputType.Email, generateRandomEmail());
            await homePage.SignUpModal.typeOnInput(InputType.Password, 'Test1234');

            await homePage.SignUpModal.createAcc();

            await expect(async () => {
                expect(await homePage.SignUpModal.isVisible()).toBe(false);
                expect(await homePage.WelcomePopup.isVisible()).toBe(true);
                expect(await homePage.WelcomePopup.titleContent()).toStrictEqual('Welcome, Ivan');
                expect(await homePage.WelcomePopup.subtitleContent()).toStrictEqual(
                    'You can start enjoying everything we have to offer'
                );
            }).toPass();
        });
        ///////////////
        await test.step('Test-step 5 | close Welcome popup', async () => {
            await homePage.WelcomePopup.closePopup();

            expect(await homePage.WelcomePopup.isVisible()).toBe(false);

            expect(await myAccount.innerText()).toStrictEqual('Hello, Ivan');

            expect(await homePage.InfoCenter.titleText()).toStrictEqual('Hi Ivan');
        });
        /////////////
        await test.step('Test-step 6 | logout from account', async () => {
            await myAccount.hoverAcc();
            expect(await myAccount.AccDropdown.isVisible()).toBe(true);

            await myAccount.AccDropdown.clickToAction(ActionType.SignOut);

            expect(await myAccount.innerText()).toStrictEqual('My Account');

            expect(await homePage.InfoCenter.isVisible()).toBe(false);
        });
    });
});
