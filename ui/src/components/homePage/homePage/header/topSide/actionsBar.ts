import { Component } from '@Core/component';
import { MyAccount } from './actionsBar/myAccount';

export class Actionsbar extends Component {
    protected LOCATORS = {
        phoneNumber: this.locator.locator('//p[contains(@class, "topStripPhoneNumber")]'),
        disabilityBtn: this.locator.locator(
            '//button[contains(@aria-label, "Accessibility button")]'
        ),
        customerCare: this.locator.locator('//div[contains(@class, "customerCare__customerCare")]'),
        myAccount: this.locator.locator('//div[contains(@class, "myAccount__myAccountMenu")]'),
    };

    public MyAccount = new MyAccount(this.LOCATORS.myAccount, this.page);
}
