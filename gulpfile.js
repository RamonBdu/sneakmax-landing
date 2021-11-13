const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const pug = require('gulp-pug')
const scss = require('gulp-sass')(require('sass'))
const del = require('del')

const src = 'src/'
const dist = 'dist/'

const path = {
  src: {
    html: src + 'pug/*.pug',
    styles: src + 'scss/styles.scss',
    scripts: src + 'js/scripts.js',
    fonts: src + 'fonts/*.*',
    images: src + 'images/*.*'
  },
  dist: {
    html: dist,
    styles: dist + 'css/',
    scripts: dist + 'js/',
    fonts: dist + 'fonts/',
    images: dist + 'images/'
  },
  watch: {
    html: src + 'pug/*.pug',
    styles: src + 'scss/styles.scss',
    scripts: src + 'js/scripts.js',
    fonts: src + 'fonts/*.*',
    images: src + 'images/*.*'
  }
}

const serverTask = () => {
  browserSync.init({
    server: {
      baseDir: dist
    },
    notify: false
  })
}

const htmlTask = () => {
  return gulp.src(path.src.html)
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(path.dist.html))
    .pipe(browserSync.stream())
}

const stylesTask = () => {
  return gulp.src(path.src.styles)
    .pipe(scss())
    .pipe(gulp.dest(path.dist.styles))
    .pipe(browserSync.stream())
}

const scriptsTask = () => {
  return gulp.src(path.src.scripts)
    .pipe(gulp.dest(path.dist.scripts))
    .pipe(browserSync.stream())
}

const imagesTask = () => {
  return gulp.src(path.src.images)
    .pipe(gulp.dest(path.dist.images))
    .pipe(browserSync.stream())
}

const fontsTask = () => {
  return gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.dist.fonts))
    .pipe(browserSync.stream())
}

const cleanTask = () => {
  return del(dist)
}

const watchTask = () => {
  gulp.watch([path.watch.html], gulp.series(htmlTask))
  gulp.watch([path.watch.styles], gulp.series(stylesTask))
  gulp.watch([path.watch.scripts], gulp.series(scriptsTask))
  gulp.watch([path.watch.images], gulp.series(imagesTask))
  gulp.watch([path.watch.fonts], gulp.series(fontsTask))
}

const tasks = gulp.series(cleanTask, htmlTask, stylesTask, scriptsTask, imagesTask, fontsTask)

exports.default = gulp.parallel(tasks, watchTask, serverTask)
