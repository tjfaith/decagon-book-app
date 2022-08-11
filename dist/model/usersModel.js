"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorInstance = void 0;
const { DataTypes, Model } = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
class AuthorInstance extends Model {
}
exports.AuthorInstance = AuthorInstance;
AuthorInstance.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: database_config_1.default,
    tableName: 'authors'
});
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
