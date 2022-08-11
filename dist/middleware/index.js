"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class Middleware {
    handleValidationError(req, res, next) {
        const error = (0, express_validator_1.validationResult)(req);
        if (!error.isEmpty()) {
            return res.json(error);
        }
        next();
    }
}
exports.default = new Middleware();
// Offset and limit
// The limit option allows you to limit the number of rows returned from a query, while offset allows you to omit a specified number of rows before the beginning of the result set. Using both limit and offset skips both rows as well as limit the rows returned
// Difference between query and params
// Status code 
// 200 get
// 201 create  
