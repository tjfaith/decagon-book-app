"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.UpdateBooksValidator = exports.CreateBooksValidator = exports.UpdateAuthorValidator = exports.CreateAuthorValidator = void 0;
const joi_1 = __importDefault(require("joi"));
// VALIDATOR FOR AUTHORS
exports.CreateAuthorValidator = joi_1.default.object().keys({
    author: joi_1.default.string().lowercase().required(),
    age: joi_1.default.number().required(),
    email: joi_1.default.string().lowercase().required().trim(),
    password: joi_1.default.string().required(),
    address: joi_1.default.string().lowercase().required(),
});
exports.UpdateAuthorValidator = joi_1.default.object().keys({
    author: joi_1.default.string().lowercase(),
    age: joi_1.default.number(),
    email: joi_1.default.string(),
    password: joi_1.default.string(),
    address: joi_1.default.string(),
});
// VALIDATOR FOR BOOKS
exports.CreateBooksValidator = joi_1.default.object().keys({
    title: joi_1.default.string().lowercase().required(),
    icon: joi_1.default.string().lowercase().required(),
    author: joi_1.default.string().lowercase().required(),
    body: joi_1.default.string().lowercase().required(),
});
exports.UpdateBooksValidator = joi_1.default.object().keys({
    title: joi_1.default.string().lowercase(),
    icon: joi_1.default.string().lowercase(),
    author: joi_1.default.string().lowercase(),
    body: joi_1.default.string().lowercase(),
});
exports.options = {
    abortEarly: false,
    error: {
        wrap: {
            label: '',
        },
    },
};
