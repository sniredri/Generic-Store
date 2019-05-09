
import Faker from 'faker';

class DataBase {
    static dataBase = null;//static type is saved on the memory awhile the app is running (the whole life of the app)

    static createInstance() {
        var randomProducts = []
        for (let index = 0; index < 50; index++) {
            randomProducts[index] = {
                productName: Faker.commerce.productName(),
                product: Faker.commerce.product(),
                price: Faker.commerce.price(),
                avatar: Faker.image.avatar(),
                imageUrl: Faker.image.imageUrl(),
                serialNumber: index,
                quantity:1
            };

        }
        return randomProducts;
    }
    static getDataBase() {
        if (!DataBase.dataBase) {//if the database is empty.
            DataBase.dataBase = DataBase.createInstance();
        }
        return DataBase.dataBase;
    }
}


export default DataBase