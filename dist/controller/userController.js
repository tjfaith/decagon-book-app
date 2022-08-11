"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthors = exports.createAuthor = void 0;
const uuid_1 = require("uuid");
const authorModel_1 = require("../model/authorModel");
const inputValidator_1 = require("../middleware/inputValidator");
async function createAuthor(req, res) {
    const id = (0, uuid_1.v4)();
    try {
        const validateResult = inputValidator_1.UserValidator.validate(req.body, inputValidator_1.options);
        if (validateResult.error) {
            return res.status(400).json({
                Error: validateResult.error.details[0].message
            });
        }
        const result = await authorModel_1.UserInstance.create({ ...req.body, id });
        res.status(201).json({ result, message: 'User Created Successfully' });
    }
    catch (error) {
        res.json({ message: "Fail to create book", status: 500, route: '/users' });
    }
}
exports.createAuthor = createAuthor;
async function getAuthors(req, res, next) {
    try {
        const limit = req.query?.limit;
        const offset = req.query?.offset;
        const record = await BookInstance.findAll({ where: {}, limit, offset });
        res.status(200).json({
            msg: "You have successfully fetch all Books",
            record
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to read",
            route: '/'
        });
    }
}
exports.getAuthors = getAuthors;
