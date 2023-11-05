import { Component } from '@Core/component';
import { AccDropdown } from './myAccount/accDropdown';

export class MyAccount extends Component {
    private LOCATORS = {
        title: this.locator.locator('//div[contains(@class, "myAccount__title")]'),
        dropDown: this.locator.locator('//div[contains(@class, "myAccount__activeClass")]'),
    };

    public hoverAcc = async (): Promise<void> => {
        await this.locator.hover();
    };

    public async innerText(): Promise<string | null> {
        return await this.LOCATORS.title.textContent();
    }

    public AccDropdown = new AccDropdown(this.LOCATORS.dropDown, this.page);
}
