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
var movie_svc_exports = {};
__export(movie_svc_exports, {
  MovieModel: () => MovieModel,
  default: () => movie_svc_default
});
module.exports = __toCommonJS(movie_svc_exports);
var import_mongoose = require("mongoose");
const movieSchema = new import_mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String, required: false },
  rating: { type: Number, required: true },
  reviews: [{ type: import_mongoose.Schema.Types.ObjectId, ref: "Review" }],
  reviewCount: { type: Number, default: 0 }
});
const MovieModel = (0, import_mongoose.model)("Movie", movieSchema);
function getAllMovies() {
  return __async(this, null, function* () {
    return MovieModel.find().populate("reviews").exec();
  });
}
function getMovieByName(name) {
  return __async(this, null, function* () {
    return MovieModel.findOne({ name }).populate("reviews").exec();
  });
}
function createMovie(movie) {
  return __async(this, null, function* () {
    const newMovie = new MovieModel(movie);
    return newMovie.save();
  });
}
function updateMovie(name, update) {
  return __async(this, null, function* () {
    return MovieModel.findOneAndUpdate({ name }, update, { new: true }).exec();
  });
}
var movie_svc_default = { getAllMovies, getMovieByName, createMovie, updateMovie };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MovieModel
});
