import { Component } from '@Core/component';

export enum InputType {
    Firstname = 'First Name',
    Lastname = 'Last Name',
    Email = 'Email',
    Password = 'Password',
}

export class SignUpModal extends Component {
    private LOCATORS = {
        inputField: (text: InputType) =>
            this.locator.locator(`//input[contains(@placeholder, "${text}")]`),

        createAccBtn: this.locator.locator('//button[contains(@aria-label, "Create new account")]'),
    };

    public async typeOnInput(input: InputType, text: string): Promise<void> {
        await this.LOCATORS.inputField(input).type(text);
    }

    public async createAcc(): Promise<void> {
        await this.LOCATORS.createAccBtn.click();
    }

    public async isVisible(): Promise<boolean> {
        return this.locator.isVisible();
    }
}
