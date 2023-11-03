import { Container } from '@Core/container';
import { Header } from '@Components/homePage/homePage/header';
import { LoginModal } from './homePage/loginModal';
import { SignUpModal } from './homePage/signUpModal';
import { WelcomePopup } from './homePage/welcomePopup';
import { InfoCenter } from './homePage/infoCenter';

export class HomePage extends Container {
    protected LOCATORS = {
        header: this.page.locator('//div[contains(@class, "header__wrapHeader")]'),
        loginModal: this.page.locator(
            '//div[contains(@class, "ReactModal__Content ReactModal__Content--after-open") and .//h2[contains(., "Access")]]'
        ),
        signUpModal: this.page.locator(
            '//div[contains(@class, "ReactModal__Content ReactModal__Content--after-open") and .//h2[contains(., "No vision")]]'
        ),
        welcomePopup: this.page.locator('//div[contains(@class, "rc-dialog-content")]'),
        infoCenter: this.page.locator('//article[contains(@class, "eligibilityWidget__wrap")]'),
    };

    public Header = new Header(this.LOCATORS.header, this.page);

    public LoginModal = new LoginModal(this.LOCATORS.loginModal, this.page);

    public SignUpModal = new SignUpModal(this.LOCATORS.signUpModal, this.page);

    public WelcomePopup = new WelcomePopup(this.LOCATORS.welcomePopup, this.page);

    public InfoCenter = new InfoCenter(this.LOCATORS.infoCenter, this.page);

    public async open(): Promise<void> {
        await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    }
}
