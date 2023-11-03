import { Component } from '@Core/component';

export class LoginModal extends Component {
    private LOCATORS = {
        createBtn: this.locator.locator(
            '//button[span/span[contains(text(), "Create UHCGlasses.com Account")]]'
        ),
    };

    public async clickCreatebtn(): Promise<void> {
        await this.LOCATORS.createBtn.click();
    }

    public async isVisible(): Promise<boolean> {
        return this.locator.isVisible();
    }
}
