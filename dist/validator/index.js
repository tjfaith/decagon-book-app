"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class BooksValidator {
    checkCreateBook() {
        return [
            (0, express_validator_1.body)('title').notEmpty().withMessage("Title is required"),
            (0, express_validator_1.body)('body').notEmpty().withMessage("Book writeup is required"),
        ];
    }
}
exports.default = new BooksValidator();
