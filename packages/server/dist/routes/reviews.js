"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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
var reviews_exports = {};
__export(reviews_exports, {
  default: () => reviews_default
});
module.exports = __toCommonJS(reviews_exports);
var import_express = __toESM(require("express"));
var import_review_svc = __toESM(require("../services/review-svc"));
var import_movie_svc = __toESM(require("../services/movie-svc"));
const router = import_express.default.Router();
router.get("/", (req, res) => __async(void 0, null, function* () {
  try {
    const reviews = yield import_review_svc.default.getAllReviews();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}));
router.get("/:movieName", (req, res) => __async(void 0, null, function* () {
  try {
    const reviews = yield import_review_svc.default.getReviewsByMovie(req.params.movieName);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}));
router.post("/", (req, res) => __async(void 0, null, function* () {
  console.log("Received request to add review:", req.body);
  try {
    const review = yield import_review_svc.default.addReview(req.body);
    const movie = yield import_movie_svc.default.getMovieByName(req.body.movieName);
    if (movie) {
      const update = {
        $push: { reviews: review._id },
        $inc: { reviewCount: 1 },
        $set: { rating: (movie.rating * movie.reviewCount + review.rating) / (movie.reviewCount + 1) }
        // Update the average rating
      };
      yield import_movie_svc.default.updateMovie(req.body.movieName, update);
    } else {
      const newMovie = {
        name: req.body.movieName,
        img: req.body.img || "",
        // Handle the image separately if needed
        rating: req.body.rating,
        reviews: [review._id],
        reviewCount: 1
      };
      yield import_movie_svc.default.createMovie(newMovie);
      res.status(201).json({ review, movie: newMovie });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}));
var reviews_default = router;
