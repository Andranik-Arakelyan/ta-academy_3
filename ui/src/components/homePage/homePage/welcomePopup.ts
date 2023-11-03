////div[contains(@class, "rc-dialog-content")]

import { Component } from '@Core/component';

export class WelcomePopup extends Component {
    private LOCATORS = {
        closeBtn: this.locator.locator('//button[contains(@class, "rc-dialog-close")]'),
        popupTitle: this.locator.locator('//h2[contains(@class, "welcomePopup")]'),
        popupSubtitle: this.locator.locator('//p[contains(text(), "You can start")]'),
    };

    public async isVisible(): Promise<boolean> {
        return await this.locator.isVisible();
    }

    public async closePopup(): Promise<void> {
        await this.LOCATORS.closeBtn.click();
    }

    public async titleContent(): Promise<string | null> {
        return await this.LOCATORS.popupTitle.textContent();
    }

    public async subtitleContent(): Promise<string | null> {
        return await this.LOCATORS.popupSubtitle.textContent();
    }
}
