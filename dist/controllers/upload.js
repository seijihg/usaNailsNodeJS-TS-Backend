"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadAvatar = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const formidable = require("formidable");
const user_1 = __importDefault(require("../models/user"));
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});
exports.uploadAvatar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const form = formidable({ multiples: false });
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        const fileName = `usanails/avatar/${fields === null || fields === void 0 ? void 0 : fields.name}`;
        const filePath = files.file.path;
        console.log(fileName);
        cloudinary_1.default.v2.uploader.destroy(fileName, (error, result) => {
            if (error) {
                res.status(408).json(error);
                return;
            }
            cloudinary_1.default.v2.uploader.upload(filePath, { folder: "usanails/avatar" }, (error, result) => __awaiter(void 0, void 0, void 0, function* () {
                const user = yield user_1.default.findByPk(fields.userId);
                if (error || user === null) {
                    res.status(408).json("Error uploading or user not found");
                    return;
                }
                user.avatar = result.url;
                user.save();
                res.json(user);
            }));
        });
    });
});
