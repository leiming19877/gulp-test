var 
    config  = require("./module-config"),
    path = require('path'),
    gulp = require( 'gulp' ),
    concat = require('gulp-concat'), // 合并文件
    //htmlmin = require('gulp-htmlmin'),//html压缩
    //replace = require('gulp-replace'),//字符串替换
    uglify = require('gulp-uglify'),// js压缩
    tap = require('gulp-tap'),//重命名
    rename = require('gulp-rename'),//重命名
    jshint = require('gulp-jshint'),//js语法检查
    cmdPack = require('gulp-cmd-pack'),
    nano = require('gulp-cssnano'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssbeautify = require('gulp-cssbeautify'),
    csscomb = require('gulp-csscomb');
 

var jsModules = [];
var cssModules = [];
var jspModules =[];
for(var i=0;i<config.modules.length;i++){
	console.log(config.modules[i]['main-js']);
	jsModules.push(config.modules[i]['main-js']);
    cssModules.push(config.modules[i]['css']);
    jspModules.push(config.modules[i]['jsp']);
}

var CSS_SRC="";

gulp.task( 'build:cmd-moudle', function(){
    return gulp.src(jsModules ,{base:'webapp'})
        .pipe( cmdPack({
           
            base : 'webapp/js/',
            tmpExtNames : ['.html'], //提供模板文件的后缀名用来区分模板
            alias: { 
                'jquery':'jquery/2.1.1/jquery-2.1.1.js',
                'jquery-mobile':'jquery.mobile-1.4.5/jquery.mobile-1.4.5.js',
                'zepto': 'zepto/zepto.js',
                'dot':'doT/doT.js',
                'iscroll':'iscroll/iscroll-4.2.js',
                'jweixin':'weixin/jweixin-1.1.0.js'
            }/*,
            ignore :[
                'jquery',
                'jquery-mobile',
                'zepto',
                'dot',
                'iscroll',
                'jweixin'
            ]*/
        }))
        .pipe(rename({ suffix: '.all' }))
        .pipe(gulp.dest('webapp'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe( gulp.dest("webapp"));
});
gulp.task("build:css",function(){
    return gulp.src(["webapp/css/module/**/*.css","!webapp/css/module/**/*.all*.css"],{base:'webapp'})
    .pipe(cssbeautify())
    .pipe(csscomb())
    .pipe(postcss([autoprefixer]))
    .pipe(rename({ suffix: '.all' }))
    .pipe(gulp.dest("webapp"))
    .pipe(nano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest("webapp"));
}
);
//复制所有jsp文件到jsp2目录下
gulp.task("build:copy-jsp",function(cb){
    return gulp.src("webapp/WEB-INF/jsp/**/*.jsp",{base:'webapp/WEB-INF/jsp'})
    .pipe(gulp.dest("webapp/WEB-INF/jsp2"));
    //cb(); // 如果 err 不是 null 或 undefined，则会停止执行，且注意，这样代表执行失败了
});

gulp.task("build:jsp",['build:copy-jsp'],function(){
    return gulp.src(jspModules,{base:'webapp/WEB-INF/jsp'})
    .pipe(tap(function (file){
            var jspFilePath = file.base+path.sep+file.relative;
            jspFilePath = path.normalize(jspFilePath);
            for(var i=0;i<jspModules.length;i++){
                //将模块js 及css替换为自动生成后的文件
                if(jspFilePath === path.normalize(jspModules[i]) ){
                    var contents = file.contents.toString();
                    var cssFilePath = cssModules[i].replace("webapp/css","");
                    var newCssFilePath = cssFilePath.replace(".css",".all.min.css");
                    var jsFilePath = jsModules[i].replace("webapp/js/","");
                    jsFilePath = jsFilePath.replace(".js","");
                    var newJsFilePath = jsFilePath+".all.min";
                    contents = contents.replace(cssFilePath,newCssFilePath);
                    contents = contents.replace(jsFilePath,newJsFilePath);
                    file.contents = new Buffer(contents);
                    break;
                }    
            }
     }))
    .pipe(gulp.dest("webapp/WEB-INF/jsp2"));
});



gulp.task("build:seajs-config",function(){
    return gulp.src("webapp/js/seajs/seajs-config-debug.js",{base:'webapp'}) 
    .pipe(tap(function (file){
             debugger;
            var filename = path.basename(file.path);
            if(filename === "seajs-config-debug.js"){
                var contents = file.contents.toString();
                contents = contents.replace(/\$1\?v=\d{1}\.\d{1}\.\d{1}/g,function(m){
                        var t = m.split("=")
                        var vn = t[1].split(".");
                        var number = parseInt(vn.join(""));
                        number++;
                        return t[0]+"="+number.toString().split("").join(".");
                });
                file.contents = new Buffer(contents); 
            }
            
     }))
    .pipe(gulp.dest('webapp'));
});

gulp.task("build:seajs",['build:seajs-config'],function(){
    return gulp.src(["webapp/js/seajs/*.js",'!webapp/js/seajs/sea-all*.js'],{base:'webapp'}) 
  /*  .pipe(tap(function (file){
            var filename = path.basename(file.path);
            if(filename === "seajs-config-debug.js"){
                var contents = file.contents.toString();
                //开启生产环境配置
                contents = contents.replace(/\/\/map:/g,"map:");
                //注释掉开发环境配置
                contents = contents.replace(/map.+\+Math\.random/g,function(m){
                            return "//"+m;
                });
                
                file.contents = new Buffer(contents); 
            }
            
     }))*/
    .pipe(concat('sea-all.js'))
    .pipe(gulp.dest('webapp/js/seajs'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('webapp/js/seajs'));
});
gulp.task("demo",function(){
    return gulp.src("./js/build/define_demo.js") 
    .pipe(jshint())
    .pipe(jshint.reporter('default'));

});


gulp.task( 'default', ['build:cmd-moudle','build:css','build:jsp','build:seajs'] );