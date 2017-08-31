var gulp = require('gulp');
var minimist = require('minimist');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var prefix = require('gulp-prefix');
var zip = require('gulp-zip');
var gulpSequence = require('gulp-sequence');
var cmd = {
    string: 'v',
    default: { v: '1.0' }
};
var option = {
    src: 'poster',
    dest: 'poster/build',
    cdn: 'http://sns_wf.cdn.sohusce.com' ///poster/  
}
var options = minimist(process.argv.slice(2), cmd);
var version = options.v;
//统一加MD5之后替换引用  
gulp.task('cdn', function() {
    var revAll = new RevAll({ dontRenameFile: [/^\/.*.html/] }); // ,/^\/.*.jpg|png/  
    gulp.src([option.src + '/templates-dev/*.html', option.src + '/static/**'])
        .pipe(revAll.revision())
        .pipe(gulp.dest(option.dest + '/' + version))
        .pipe(revAll.versionFile())
        .pipe(gulp.dest(option.dest + '/' + version))
        .pipe(revAll.manifestFile())
        .pipe(gulp.dest(option.dest + '/' + version));
});
gulp.task("rep", function() {
    var manifest = gulp.src(option.dest + '/' + version + "/rev-manifest.json");
    console.log(option.dest + '/' + version);
    return gulp.src(option.dest + '/' + version + '/templates-dev/*.html')
        .pipe(revReplace({ manifest: manifest }))
        .pipe(gulp.dest(option.src + '/templates'));
});
gulp.task('prefix', function() {
    console.log('加CDN前缀...');
    return gulp.src(option.src + '/templates/*.html')
        .pipe(prefix(option.cdn, null))
        .pipe(gulp.dest(option.src + '/templates/'));
})
gulp.task('htmlmin', function() {
    return gulp.src([option.src + '/templates/*.html'], { base: option.src })
        .pipe(minifyHtml())
        .pipe(gulp.dest(option.src));
})
gulp.task('jsmin', function() {
    return gulp.src([option.dest + '/' + version + '/static/js/*.js', option.dest + '/' + version + '/static/imgcut/js/*.js'], { base: option.dest + '/' + version })
        .pipe(uglify())
        .pipe(gulp.dest(option.dest + '/' + version));
})
gulp.task('cssmin', function() {
    return gulp.src([option.dest + '/' + version + '/static/css/*.css', option.dest + '/' + version + '/static/imgcut/css/*.css'], { base: option.dest + '/' + version })
        .pipe(minifyCss())
        .pipe(gulp.dest(option.dest + '/' + version));
})
gulp.task('zip', function() {
    console.log('压缩中...')
    return gulp.src([option.dest + '/' + version + '/static/**', ])
        .pipe(zip('static.zip'))
        .pipe(gulp.dest(option.dest + '/' + version));
})
gulp.task('r', function(cb) {
    gulpSequence('rep', 'prefix', ['htmlmin', 'jsmin', 'cssmin'], 'zip', cb)
})