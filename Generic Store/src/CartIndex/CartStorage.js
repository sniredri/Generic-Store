class CartStorage {
    static CartData = [];//static type is saved on the memory awhile the app is running (the whole life of the app)

    static addItem(item) {
        if (CartStorage.CartData === []) {
            CartStorage.CartData.push(item);
        }
        else {
            CartStorage.quantityControl(item, "addItem");
        }
    }
    static quantityInc(item) {
        for (let index = 0; index < CartStorage.CartData.length; index++) {
            if (item.serialNumber === CartStorage.CartData[index].serialNumber) {
                CartStorage.CartData[index].quantity += 1;
                return;
            }
        }
        CartStorage.CartData.push(item);
    }
    static quantityDec(item) {
        for (let index = 0; index < CartStorage.CartData.length; index++) {
            if (item.serialNumber === CartStorage.CartData[index].serialNumber) {
                if (CartStorage.CartData[index].quantity <= 0) {
                    return;
                }
                else {
                    CartStorage.CartData[index].quantity -= 1;
                    return;
                }
            }
        }
    }
    static quantityControl(item, eNum) {
        if (eNum === "addItem") {
            CartStorage.quantityInc(item);
        }
        if (eNum === "deleteItem") {
            CartStorage.quantityDec(item);
        }
    }

    static deletItem(deleteItem) {
        for (let index = 0; index < CartStorage.CartData.length; index++) {
            if (deleteItem === CartStorage.CartData[index].serialNumber) {
                CartStorage.CartData.splice(index, 1);
                break;
            }
        }
    }
    static getCart() {
        return CartStorage.CartData;
    }
    static upDateCart(newCart) {
        CartStorage.CartData=newCart;
    }
}

export default CartStorage