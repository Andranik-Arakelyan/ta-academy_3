import { Component } from '@Core/component';
import { fireEvent } from '@testing-library/react';

export class ModalAddItem extends Component {
    protected selectors = {
        title: 'h2',
        inputName: '//input[contains(@data-testid, "input-name")]',
        inputPrice: '//input[contains(@data-testid, "input-price")]',
        inputQuantity: '//input[contains(@data-testid, "input-quantity")]',
        buttonCreate: '//button[text()="Create"]',
    };

    public async fillForm(): Promise<void> {
        const [nameInput] = await this.element.waitForXpath(this.selectors.inputName);
        const [priceInput] = await this.element.waitForXpath(this.selectors.inputPrice);
        const [quantityInput] = await this.element.waitForXpath(this.selectors.inputQuantity);

        fireEvent.change(nameInput, { target: { value: 'Apple' } });
        fireEvent.change(priceInput, { target: { value: 25 } });
        fireEvent.change(quantityInput, { target: { value: 2 } });
    }

    public async clickCreate(): Promise<void> {
        const [buttonCreate] = await this.element.waitForXpath(this.selectors.buttonCreate);
        fireEvent.click(buttonCreate);
    }
}
