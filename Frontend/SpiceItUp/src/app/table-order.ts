export interface TableOrder {
    
    _id:String,
    userId:{
        _id:String,
        first_name:String,
        last_name:String,
        gender:String,
        phone:Number,
        email:String
    },
    date:Date,
    time_slot:String,
    table:String,
    status: String,
    special_request:String,
    feedback:String
}
