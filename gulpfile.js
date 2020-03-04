const gulp = require("gulp");
const del = require("del");
const sass = require("gulp-sass");
const prefix = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const browserSync = require("browser-sync");
const sourceMaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const pug = require("gulp-pug");

sass.compiler = require("node-sass");

gulp.task("css:dev", function() {
  return gulp
    .src("./src/sass/style.sass")
    .pipe(sourceMaps.init())
    .pipe(sass())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest("./dist"))
    .pipe(browserSync.stream());
});

gulp.task("js:dev", function() {
  return gulp
    .src("./src/js/main.js")
    .pipe(gulp.dest("./dist"));
});

gulp.task("css:prod", function() {
  return gulp
    .src("./src/sass/style.sass")
    .pipe(sass())
    .pipe(gulp.dest("./dist"));
});

gulp.task("assets", function() {
  return gulp.src("./src/assets/**/*").pipe(gulp.dest("./dist"));
});

gulp.task("images", function() {
  return gulp.src("./src/img").pipe(gulp.dest("./dist"));
});

gulp.task("prefix", function() {
  return gulp
    .src("./dist/style.css")
    .pipe(
      prefix({
        browsers: ["last 2 version", "> 0.25%"],
        cascade: true,
        remove: true
      })
    )
    .pipe(gulp.dest("./dist"));
});

gulp.task("minify", function() {
  return gulp
    .src("./dist/style.css")
    .pipe(
      cleanCSS({
        compatibility: "ie8"
      })
    )
    .pipe(gulp.dest("./dist"));
});

gulp.task("watch", function() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
});

gulp.task("js:prod", function() {
  return gulp
    .src("./main.js")
    .pipe(
      babel({
        presets: ["@babel/preset-env"]
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("./dist"));
});

gulp.task("pug", function() {
  return gulp
    .src("./src/pug/*.pug")
    .pipe(pug({}))
    .pipe(gulp.dest("./dist"))
    .pipe(browserSync.stream());
});

gulp.task("clean", function() {
  return del(["dist"]);
});

gulp
  .watch("./src/sass/**/*.sass")
  .on("change", gulp.series("css:dev"), browserSync.reload);
gulp
  .watch("./src/js/**/*.js")
  .on("change", gulp.series("js:dev"), browserSync.reload);
gulp
  .watch("./src/pug/**/*.pug")
  .on("change", gulp.series("pug"), browserSync.reload);

gulp.task(
  "dev",
  gulp.series("clean", "pug", "css:dev", "js:dev", "images", "assets", "watch")
);
gulp.task(
  "build",
  gulp.series(
    "clean",
    "pug",
    "images",
    "assets",
    "css:prod",
    "prefix",
    "minify"
  )
);
