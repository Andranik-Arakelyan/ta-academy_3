import { Component } from '@Core/component';

export class InfoCenter extends Component {
    private LOCATORS = {
        title: this.locator.locator('//header[contains(@class, "eligibilityWidget__header")]//p'),
    };

    public async titleText(): Promise<string | null> {
        return await this.LOCATORS.title.textContent();
    }

    public async isVisible(): Promise<boolean> {
        return await this.locator.isVisible();
    }
}
