const { DataTypes, Model } =  require("sequelize"); 
import db from "../config/database.config";
import { BookInstance } from '../model/booksModel'

interface AuthorAttribute{
    id:string;
    author:string;
    dateRegistered:string,
    age:number;
    email:string;
    password:string;
    address:string;
}

export class AuthorInstance extends Model<AuthorAttribute>{}

AuthorInstance.init({
    id:{
      type:DataTypes.UUIDV4,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true,
      allowNull:false,
    },
    author:{
        type:DataTypes.STRING,
        allowNull:false
    },
    dateRegistered:{
        type:DataTypes.TIME,
        defaultValue:new Date().getTime(),
        allowNull:false
    },
    age:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            notNull:{
                msg:'email is required'
            },
            isEmail:{
                msg:'Please provide a a valid Email'
            }
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:true
    },
    address:{
        type:DataTypes.STRING,
        allowNull:true
    }
},{
    sequelize:db,
    tableName:'authors'
})

AuthorInstance.hasMany(BookInstance, {foreignKey:'author_id', as: 'books'})
BookInstance.belongsTo(AuthorInstance, {foreignKey:'author_id', as: 'authors'})

// [
//     {
//       id: 1,
//       author: "John Stone",
//       dateRegistered: 1637159465420,
//       age: 28,
//       email:"precious@gmail.com",
//       password:"example",
//       address: "5, Wall Street, Buckingham",
//       books: [
//         {
//           id: "book1"
//           name: "Tomorrow is coming",
//           isPublished: true,
//           datePublished: 1637159508581,
//           serialNumber: 0010
//         },
//         {
//           id: "book2"
//           name: "October's very own",
//           isPublished: false,
//           datePublished: null,
//           serialNumber: null
//         }
//       ]
//     }
// ]