export class UserModel{
    constructor(
      public userId:Number,
      public firstName:String,
      public lastName:String,
      public tel:String,
      public nic:String,
      public address:String,
      public email:String,
      public password:String,
      public regDate:Date,
      public status:Number,
      public role:Number,
      public profileImage:Number
    ){}
}