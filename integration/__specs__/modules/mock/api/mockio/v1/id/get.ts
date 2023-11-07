import { MockObject } from '@Mocks/mockObject';

export class GetCartItemsMock extends MockObject {
    public constructor() {
        super();
        this.path = {
            url: 'https://mocki.io/v1/a92eda42-69d0-43c5-bc66-cd56e4b8c906',
            method: 'get',
        };
    }

    public getFixture(): Record<string, unknown>[] {
        return [
            {
                id: 1,
                name: 'T-Shirt',
                price: 150,
                quantity: 2,
            },
            {
                id: 2,
                name: 'Dress',
                price: 45,
                quantity: 3,
            },
            {
                id: 3,
                name: 'Pants',
                price: 40,
                quantity: 1,
            },
        ];
    }
}
