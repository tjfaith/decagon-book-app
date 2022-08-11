"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getSingleBook = exports.getBooks = exports.create_books = void 0;
const booksModel_1 = require("../model/booksModel");
const utils_1 = require("../middleware/utils");
async function create_books(req, res) {
    try {
        const validateResult = utils_1.CreateBooksValidator.validate(req.body, utils_1.options);
        if (validateResult.error) {
            return res.status(400).json({
                Error: validateResult.error.details[0].message,
            });
        }
        const author_id = req.authorId;
        const record = await booksModel_1.BookInstance.create({ ...req.body, author_id });
        res.status(201).json({ record, message: "Book Created Successfully" });
    }
    catch (error) {
        res.json({ message: error, status: 500, route: "/create" });
    }
}
exports.create_books = create_books;
async function getBooks(req, res, next) {
    try {
        const limit = req.query?.limit;
        const offset = req.query?.offset;
        const record = await booksModel_1.BookInstance.findAndCountAll({
            limit,
            offset,
            attributes: { exclude: ["updatedAt"] },
            order: [["createdAt", "DESC"]],
        });
        // res.status(200).json({
        //     msg:"You have successfully fetch all Books",
        //     totalBooks: record.count,
        //     data:record.rows
        // })
        res.render("index", {
            title: "Books",
            totalBooks: record.count,
            msg: "You have successfully fetch all Books",
            data: record.rows,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "failed to read",
        });
    }
}
exports.getBooks = getBooks;
async function getSingleBook(req, res, next) {
    try {
        const { id } = req.params;
        const record = await booksModel_1.BookInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(404).json({
                Error: "book not found",
            });
        }
        // res.status(200).json({
        //   message: "Successfully gotten book information",
        //   record,
        // });
        res.status(200);
        res.render('components/update_book', { title: 'update', record });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed get book",
            route: "/:id",
        });
    }
}
exports.getSingleBook = getSingleBook;
async function updateBook(req, res, next) {
    try {
        const { id } = req.params;
        const { name, icon, isPublished } = req.body;
        const validateResult = utils_1.UpdateBooksValidator.validate(req.body, utils_1.options);
        if (validateResult.error) {
            return res.status(400).json({
                Error: validateResult.error.details[0].message,
            });
        }
        const record = await booksModel_1.BookInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(404).json({
                Error: "Book not found",
            });
        }
        const updateRecord = await record.update({
            name,
            icon,
            isPublished,
        });
        res.status(200).json({
            message: `successful`,
            record: updateRecord,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to update",
            route: "/",
        });
    }
}
exports.updateBook = updateBook;
async function deleteBook(req, res, next) {
    try {
        const { id } = req.params;
        const record = await booksModel_1.BookInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(404).json({
                msg: `Book with Id: ${id} not found`,
            });
        }
        const deletedRecord = await record.destroy();
        return res.status(200).json({
            message: `successful`,
            deletedRecord,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed delete book",
            route: "/:id",
        });
    }
}
exports.deleteBook = deleteBook;
