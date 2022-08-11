"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authorModel_1 = require("../model/authorModel");
// generate token
const generateToken = (authorData) => {
    return jsonwebtoken_1.default.sign({ authorData }, process.env.MY_SECRET, { expiresIn: '1h' });
};
exports.generateToken = generateToken;
// verify token
async function verifyToken(req, res, next) {
    try {
        const bearerHeader = req.headers.authorization;
        // check if bearer is undefined 
        if (!bearerHeader) {
            return res.status(404).json({ Error: "Author not verified" });
        }
        const token = bearerHeader.split(' ')[1];
        // res.status(403).json({
        //     msg:'Unauthorize user'
        // })
        let verified = jsonwebtoken_1.default.verify(token, process.env.MY_SECRET);
        if (!verified) {
            return res.status(403).json({ Error: "Un-authorized user" });
        }
        const { authorData } = verified;
        const author = await authorModel_1.AuthorInstance.findOne({ where: { id: authorData } });
        if (!author) {
            return res.status(404).json({ Error: "Author not verified" });
        }
        req.authorId = authorData;
        next();
    }
    catch (error) {
        res.status(403).json({ Error: "An error occur", error });
    }
}
exports.verifyToken = verifyToken;
