import { Component } from '@Core/component';
import { GuaranteeText } from './topSide/guaranteeText';
import { Actionsbar } from './topSide/actionsBar';

export class TopSide extends Component {
    protected LOCATORS = {
        guaranteeText: this.locator.locator('//p[contains(@class, "topStrip__leftSide")]'),
        actionsBar: this.locator.locator('//div[contains(@class, "topStripMenu__menu")]'),
    };

    public GuaranteeText = new GuaranteeText(this.LOCATORS.guaranteeText, this.page);

    public ActionsBar = new Actionsbar(this.LOCATORS.actionsBar, this.page);
}
