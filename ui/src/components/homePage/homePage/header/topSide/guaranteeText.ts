import { Component } from '@Core/component';

export class GuaranteeText extends Component {
    public async isVisible(): Promise<boolean> {
        return await this.locator.isVisible();
    }
}
