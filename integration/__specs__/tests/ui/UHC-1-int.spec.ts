import { Mock } from '@Core/mock';
import { CartPage } from '@Components/cartPage/cartPage';
import { GetCartItemsMock } from '@Mocks/api/mockio/v2/id/get';

describe('UHC-1-int', () => {
    const mock = Mock.getInstance();
    let cartPage: CartPage;

    beforeAll(async () => {
        cartPage = new CartPage();
        mock.addMocks(new GetCartItemsMock());
        cartPage.debug();
    });

    afterAll(() => {
        cartPage.destroy();
    });

    test('Add cart item', async () => {
        await cartPage.fulfill();
        const cartList = await cartPage.getCartList();
        const lengthBefore = (await cartList.getCartItems()).length;

        reporter.startStep('Add cart item modal is displayed');
        const modalAddItem = await cartPage.openModalAddItem();
        expect(await cartPage.isModalVisible()).toBe(true);
        reporter.endStep();

        reporter.startStep('Entered data must match with displayed one');
        await modalAddItem.fillForm();
        await modalAddItem.clickCreate();
        expect(await cartPage.isModalVisible()).toBe(false);

        const lengthNow = (await cartList.getCartItems()).length;
        expect(lengthNow).toStrictEqual(lengthBefore + 1);

        const addedItem = (await cartList.getCartItems())[0];
        expect(await addedItem.getQuantity()).toStrictEqual(2);
        expect(await addedItem.getPriceForOne()).toStrictEqual(25);
        expect(await addedItem.getTitle()).toStrictEqual('Apple');
        reporter.endStep();

        reporter.startStep('Delete button clicking must delete item from the list');
        await addedItem.deleteItem();
        const cartListAfterRemove = await cartList.getCartItems();
        expect(cartListAfterRemove.includes(addedItem)).toBe(false);
        reporter.endStep();
    });
});
