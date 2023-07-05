export interface Order {
    [x: string]: any;

    _id: String;
    user_id: String;
    booking_id: string;
    item_id: String,
    order_items: {
        _id:String,
        item_name: String,
        item_type: String,
        quantity: any,
        price: any,
        total: Number
    }[];
}
