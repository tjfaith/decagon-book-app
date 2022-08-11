const { DataTypes, Model } =  require("sequelize");
import db from "../config/database.config";
import { AuthorInstance } from "./authorModel";

interface BookAttribute{
    id:string;
    name:string;
    icon:string;
    isPublished:boolean;
    datePublished:string;
    serialNumber:number;
    author_Id:string
}

export class BookInstance extends Model<BookAttribute>{}

BookInstance.init({
    id:{
      type:DataTypes.UUIDV4,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true,
      allowNull:false,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    icon:{
        type:DataTypes.STRING,
        allowNull:true
    },
    isPublished:{
        type:DataTypes.BOOLEAN,
        allowNull:true
    },
    datePublished:{
        type:DataTypes.TIME,
        defaultValue:new Date().getTime(),
        allowNull:false
    },
    serialNumber:{
        type:DataTypes.INTEGER,
        autoIncrement:true
    },
    author_id:{
        type:DataTypes.UUIDV4, 
        allowNull:false
    }
},{
    sequelize:db,
    tableName:'books'
})

// // BookInstance(AuthorInstance, {foreignKey:'author_id', as: 'books'})
// AuthorInstance.belongsTo(BookInstance, {foreignKey:'author_id', as: 'authors'})