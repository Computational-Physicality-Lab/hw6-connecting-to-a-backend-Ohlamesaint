import uuid from 'uuid'

interface CartItemInterface {
    name: string;
    quantity: number;
    img: any;
    size: string;
    price: string;
    color: string;
    id: string;
    uid: string;
    userCreated: boolean;
}

export default CartItemInterface;