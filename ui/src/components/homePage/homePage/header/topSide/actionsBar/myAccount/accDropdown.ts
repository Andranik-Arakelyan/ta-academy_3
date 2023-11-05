import { Component } from '@Core/component';

export enum ActionType {
    Login = 'Log in',
    SignOut = 'Sign out',
    MyAccount = 'My Account',
}

export class AccDropdown extends Component {
    private LOCATORS = {
        action: (btnName: ActionType) =>
            this.locator.locator(`//button[contains(text(),"${btnName}")]`),
    };

    public async isVisible(): Promise<boolean> {
        return await this.locator.isVisible();
    }

    public async clickToAction(btnName: ActionType): Promise<void> {
        await this.LOCATORS.action(btnName).click();
    }
}
