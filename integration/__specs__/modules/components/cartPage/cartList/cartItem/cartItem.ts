import { Component } from '@Core/component';

export class CartItem extends Component {
    protected selectors = {
        title: 'h2',
        fullPrice: './/div[contains(@class, "fullprice")]',
        priceForOne: './/div[contains(@class, "price-for-one")]',
        quantity: './/div[@data-testid="quantity-current"]',
        addButton: './/button[text()="+"]',
        deleteItemButton: '//button[@data-testid="delete-btn"]',
    };

    public async getPriceForAll(): Promise<number> {
        const [priceElement] = await this.element.waitForXpath(this.selectors.fullPrice);
        return Number(priceElement.textContent.replace('$', ''));
    }

    public async getQuantity(): Promise<number> {
        const [quantity] = await this.element.waitForXpath(this.selectors.quantity);
        return +quantity.textContent;
    }

    public async getPriceForOne(): Promise<number> {
        const [priceElement] = await this.element.waitForXpath(this.selectors.priceForOne);
        const xIndex = priceElement.textContent.indexOf('×');
        return +priceElement.textContent.slice(1, xIndex).trim();
    }

    public async getTitle(): Promise<string> {
        const [title] = await document.waitForQuerySelector(this.selectors.title);
        return title.textContent;
    }

    public async addOne(): Promise<void> {
        await this.element.clickByXpath(this.selectors.addButton);
    }

    public async deleteItem(): Promise<void> {
        await this.element.clickByXpath(this.selectors.deleteItemButton);
    }
}
