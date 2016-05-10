var 
    config  = require("./module-config"),
    path = require('path'),
    gulp = require( 'gulp' ),
    concat = require('gulp-concat'), // 合并文件
    uglify = require('gulp-uglify'),// js压缩
    tap = require('gulp-tap'),
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
	console.log("对"+config.modules[i]['main-js']+"进行cmd打包。");
	console.log("对"+config.modules[i]['css']+"进行css打包。");
	console.log("对"+config.modules[i]['jsp']+"进行jsp复制替换打包。");
	jsModules.push(config.modules[i]['main-js']);
    cssModules.push(config.modules[i]['css']);
    jspModules.push(config.modules[i]['jsp']);
}
var globalCss = ['webapp/css/global/reset.css',
                 'webapp/css/global/media.css',
                 'webapp/css/global/function.css',
                 'webapp/css/global/page-unit.css',
                 'webapp/css/global/iconfont.css',
                 ];
//打包全局样式
gulp.task("build:global-css",function(){
	 return gulp.src(globalCss,
			{base:'webapp/css/global'})
	.pipe(concat('global-1.0.1.all.css'))
    .pipe(cssbeautify())
    .pipe(csscomb())
    .pipe(postcss([autoprefixer]))
    .pipe(gulp.dest("webapp/css/global"))
    .pipe(nano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest("webapp/css/global"));
}
);
//对模块js进行验证
gulp.task('build:cmd-moudle-check', function(){
    //return gulp.src(['webapp/js/module/**/*.js','!webapp/js/module/**/*.all*.js',] ,{base:'webapp'})
    return gulp.src(['webapp/js/module/purchase/receipt/receiptList.all.js','!webapp/js/module/**/*.all*.js',] ,{base:'webapp'})

    .pipe(tap(function (file){
	            var jsFilePath = file.base+path.sep+file.relative;
	            jsFilePath = path.normalize(jsFilePath);
	            //console.log("对文件"+jsFilePath+"进行检查");
	     }))    
	    .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//打包js主模块
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
        //.pipe(jshint())
        //.pipe(jshint.reporter('default'))
        .pipe(gulp.dest('webapp'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe( gulp.dest("webapp"));
});
//打包样式
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
//对要替换的jsp进行替换
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
                    var jsFilePath = jsModules[i].replace("webapp/js/","seajs.use\(\"");
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
//对seajs-config 版本配置+1，以防止出现缓存问题
gulp.task("build:seajs-config",function(){
    return gulp.src("webapp/js/seajs/seajs-config-debug.js",{base:'webapp'}) 
    .pipe(tap(function (file){
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
//打包seajs
gulp.task("build:seajs",['build:seajs-config'],function(){
    return gulp.src(["webapp/js/seajs/*.js",'!webapp/js/seajs/sea-all*.js'],{base:'webapp'}) 
    .pipe(concat('sea-all.js'))
    .pipe(gulp.dest('webapp/js/seajs'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('webapp/js/seajs'));
});
//执行全局打包
gulp.task( 'default', ['build:cmd-moudle','build:css','build:jsp','build:seajs'] );
//gulp.task( 'default', ['build:global-css'] );