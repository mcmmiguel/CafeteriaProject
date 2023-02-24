const { src, dest, watch, series} = require('gulp');   //Las llaves después de const es porque este gulp exporta multiples funciones
// cuando no las tenga es porque solo exporta una funcion va. 
//La funcion src encuentra un archivo y la funcion dest te permite guardarlo en disco va.


// GRUPO CSS Y SASS
const sass = require('gulp-sass')(require('sass')); //gulp-sass solo compila esa hoja de estilos
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano')

//GRUPO IMAGENES 
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(  done ) {
    // Compilar pasos
    // Paso 1: Identificar archivo, 2. Compilarla, 3. Guardar el .css

    

    src('src/scss/app.scss')
    .pipe( sourcemaps.init() )
        .pipe( sass() )
        .pipe( postcss([ autoprefixer(), cssnano() ]) ) //Para crear codigo que será soportado por otros navegadores
        .pipe( sourcemaps.write('.'))
        .pipe( dest('build/css') )

    done();
}

function imagenes() {
    return src( 'src/img/**/*' )
        .pipe(  imagemin({  optimizationLevel: 3 })  )
            .pipe( dest( 'build/img' ) );
}

function imagenWebp() {
    const opciones = {
        quality: 50
    }
    return src( 'src/img/**/*.{png,jpg}' ) //Solo lo hará con imagenes png y jpg
        .pipe(webp(opciones) )
            .pipe( dest('build/img') );
}

function imagenAvif() {
    const opciones = {
        quality: 50
    }
    return src( 'src/img/**/*.{png,jpg}' )
    .pipe(avif(opciones) )
        .pipe(dest( 'build/img' ));
}

function dev() {
    watch( 'src/scss/**/*.scss', css );  //Para tener monitoreada toda la carpeta
    watch( 'src/img/**/*', imagenes );
}



exports.css = css; 
exports.dev = dev;
exports.imagenes = imagenes;
exports.imagenWebp = imagenWebp;
exports.imagenAvif =imagenAvif;
exports.default = series(  imagenes, imagenWebp, imagenAvif, css, dev );


// Series - Se inicia una tarea y hasta que finaliza inicia la siguiente
// Parallel - Todas inician al mismo tiempo 