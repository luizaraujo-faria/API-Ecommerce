import { sequelize } from '../config/database';
import { User } from './User';
import { Categories } from './Categories';
import { Products } from './Products';
import { Order } from './Order';
import { OrderItems } from './OrderItems';
import { CartItems } from './CartItems';

const models = {
    Products,
    Categories,
    CartItems,
    OrderItems,
    User,
    Order
};

Object.values(models).forEach((model: any) => {
    if(typeof model.associate === 'function'){
        model.associate(models);
    };
});

export { sequelize };
export default models;