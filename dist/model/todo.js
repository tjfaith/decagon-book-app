"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoInstance = void 0;
const types_1 = require("sequelize/types");
const database_config_1 = __importDefault(require("../config/database.config"));
class TodoInstance extends types_1.Model {
}
exports.TodoInstance = TodoInstance;
TodoInstance.init({
    id: {
        type: types_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: types_1.DataTypes.STRING,
        allowNull: false
    },
    completed: {
        type: types_1.DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    sequelize: database_config_1.default,
    tableName: 'todo'
});
