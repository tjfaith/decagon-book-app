"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccount = exports.logoutAuthor = exports.loginAuthor = exports.updateAuthor = exports.createAuthor = exports.adminData = exports.getSingleAuthor = exports.getAuthors = void 0;
const authorModel_1 = require("../model/authorModel");
const booksModel_1 = require("../model/booksModel");
const auth_1 = require("../middleware/auth");
const utils_1 = require("../middleware/utils");
const bcrypt_1 = __importDefault(require("bcrypt"));
// GET ALL AUTHORS
async function getAuthors(req, res, next) {
    try {
        const limit = req.query?.limit;
        const offset = req.query?.offset;
        const data = await authorModel_1.AuthorInstance.findAndCountAll({
            limit,
            offset,
            attributes: ['id', 'author', 'dateRegistered', 'age', 'email', 'address'],
            include: [
                {
                    model: booksModel_1.BookInstance,
                    as: 'books',
                    attributes: ['id', 'name', 'isPublished', 'datePublished', 'serialNumber']
                }
            ]
        });
        res.status(200).json({
            msg: "Successful",
            totalAuthor: data.count,
            data: data.rows
        });
    }
    catch (error) {
        res.status(500).json({
            msg: error + "failed to read",
            route: '/'
        });
    }
}
exports.getAuthors = getAuthors;
// GET SINGLE AUTHOR
async function getSingleAuthor(req, res, next) {
    try {
        const { id } = req.params;
        const data = await authorModel_1.AuthorInstance.findOne({
            where: { id },
            attributes: ['id', 'author', 'dateRegistered', 'age', 'email', 'address'],
            include: [
                {
                    model: booksModel_1.BookInstance,
                    as: 'books',
                    attributes: ['id', 'name', 'isPublished', 'serialNumber']
                }
            ]
        });
        if (!data) {
            return res.status(404).json({
                Error: "Author not found"
            });
        }
        res.status(200).json({
            msg: "Successful",
            data
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed get author",
            route: '/:id'
        });
    }
}
exports.getSingleAuthor = getSingleAuthor;
// AUTHOR DASHBOARD
async function adminData(req, res, next) {
    try {
        const data = await authorModel_1.AuthorInstance.findOne({
            where: { id: req.authorId },
            attributes: ['id', 'author', 'dateRegistered', 'age', 'email', 'address'],
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: booksModel_1.BookInstance,
                    as: 'books',
                    attributes: ['id', 'name', 'icon', 'isPublished', 'serialNumber', 'createdAt'],
                }
            ]
        });
        if (!data) {
            return res.status(404).json({
                Error: "Author not found"
            });
        }
        console.log(data.dataValues);
        // res.json({
        //     msg:"Successful",
        //     data:data
        // })
        res.status(200);
        res.render("admin", { title: "admin", data });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed get author",
            route: '/:id'
        });
    }
}
exports.adminData = adminData;
// CREATE NEW AUTHOR / SIGNUP
async function createAuthor(req, res) {
    try {
        const validateResult = utils_1.CreateAuthorValidator.validate(req.body, utils_1.options);
        const salt = await bcrypt_1.default.genSalt();
        console.log(req.body.password);
        req.body.password = await bcrypt_1.default.hash(req.body.password, salt);
        if (validateResult.error) {
            return res.status(400).json({
                Error: validateResult.error.details[0].message
            });
        }
        if (await authorModel_1.AuthorInstance.findOne({ where: { email: req.body.email } })) {
            return res.status(409).json({
                msg: "Email already Exist, please login or change email"
            });
        }
        await authorModel_1.AuthorInstance.create(req.body);
        res.json({ message: 'Author Created Successfully' });
        res.redirect('/login');
    }
    catch (error) {
        res.json({ error, message: "Fail to create author", status: 500, });
    }
}
exports.createAuthor = createAuthor;
// UPDATE AUTHOR
async function updateAuthor(req, res, next) {
    try {
        const bodyData = req.body;
        const validateResult = utils_1.UpdateAuthorValidator.validate(req.body, utils_1.options);
        if (validateResult.error) {
            return res.status(400).json({
                Error: validateResult.error.details[0].message
            });
        }
        const data = await authorModel_1.AuthorInstance.findOne({ where: { id: req.authorId },
            attributes: { exclude: ['password'] }
        });
        if (!data) {
            return res.status(404).json({
                Error: "Author not found"
            });
        }
        const updateRecord = await data.update({
            author: bodyData.author,
            age: bodyData.age,
            email: bodyData.email,
            password: bodyData.password,
            address: bodyData.address
        });
        res.status(200).json({
            msg: 'Data updated successfully',
            record: updateRecord
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to update",
            error,
            route: '/'
        });
    }
}
exports.updateAuthor = updateAuthor;
// LOGIN FUNCTIONALITY
async function loginAuthor(req, res, next) {
    try {
        const data = await authorModel_1.AuthorInstance.findOne({
            where: { email: req.body.email },
            // attributes:{ exclude: ['createdAt','updatedAt'] }
        });
        if (!data) {
            // console.log('what is wrong with u');
            res.status(401).json({
                message: "Author not found"
            });
            // return res.status(404).json({
            //     message:"Author not found"
            // })
        }
        else {
            if (await bcrypt_1.default.compare(req.body.password, data.password)) {
                const token = (0, auth_1.generateToken)(data.id);
                res.cookie('authorized', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
                res.cookie('author_id', data.id, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
                // console.log(token);
                res.status(200).json({
                    message: 'Login successful',
                    // token, 
                    data: { id: data.id, author: data.author, dateRegistered: data.dateRegistered, age: data.age, email: data.email, address: data.address }
                });
                // res.redirect('/dashboard')
            }
            else {
                res.status(401).json({
                    message: 'Invalid Login Details'
                });
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "failed to get author",
        });
    }
}
exports.loginAuthor = loginAuthor;
async function logoutAuthor(req, res) {
    res.cookie('authorized', '', { maxAge: 1 });
    res.status(200).json({
        message: "successful",
    });
}
exports.logoutAuthor = logoutAuthor;
// DELETE FUNCTIONALITY
async function deleteAccount(req, res, next) {
    try {
        // const {id} = req.params
        const authorData = await authorModel_1.AuthorInstance.findOne({ where: { id: req.authorId } });
        if (!authorData) {
            return res.status(404).json({
                msg: `Oops! an error ocured`
            });
        }
        await authorModel_1.AuthorInstance.destroy({ where: { id: req.authorId } });
        await booksModel_1.BookInstance.destroy({ where: { author_id: req.authorId } });
        return res.status(200).json({
            msg: `Your account has been deleted successfully`
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed delete Author"
        });
    }
}
exports.deleteAccount = deleteAccount;