"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.UserValidator = exports.UpdateBooksSchema = exports.CreateBooksSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.CreateBooksSchema = joi_1.default.object().keys({
    title: joi_1.default.string().lowercase().required(),
    icon: joi_1.default.string().lowercase().required(),
    author: joi_1.default.string().lowercase().required(),
    body: joi_1.default.string().lowercase().required()
});
exports.UpdateBooksSchema = joi_1.default.object().keys({
    title: joi_1.default.string().lowercase(),
    icon: joi_1.default.string().lowercase(),
    author: joi_1.default.string().lowercase(),
    body: joi_1.default.string().lowercase()
});
exports.UserValidator = joi_1.default.object().keys({
    author: joi_1.default.string().lowercase().required(),
    age: joi_1.default.number().required(),
    email: joi_1.default.string().required,
    password: joi_1.default.string().required,
    address: joi_1.default.string().required(),
});
exports.options = {
    abortEarly: false,
    error: {
        wrap: {
            label: ''
        }
    }
};
