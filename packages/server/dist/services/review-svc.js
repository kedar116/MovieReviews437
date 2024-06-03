"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var review_svc_exports = {};
__export(review_svc_exports, {
  ReviewModel: () => ReviewModel,
  default: () => review_svc_default
});
module.exports = __toCommonJS(review_svc_exports);
var import_mongoose = require("mongoose");
const reviewSchema = new import_mongoose.Schema({
  movieName: { type: String, required: true },
  user: { type: String, required: true },
  review: { type: String, required: true },
  rating: { type: Number, required: true },
  year: { type: Number, required: true },
  director: { type: String }
});
const ReviewModel = (0, import_mongoose.model)("Review", reviewSchema);
function getAllReviews() {
  return __async(this, null, function* () {
    return ReviewModel.find().exec();
  });
}
function getReviewsByMovie(movieName) {
  return __async(this, null, function* () {
    return ReviewModel.find({ movieName }).exec();
  });
}
function addReview(review) {
  return __async(this, null, function* () {
    const newReview = new ReviewModel(review);
    return newReview.save();
  });
}
var review_svc_default = { getAllReviews, getReviewsByMovie, addReview };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ReviewModel
});
