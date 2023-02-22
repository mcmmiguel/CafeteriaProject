const { src, dest, watch, series} = require('gulp');   //Las llaves después de const es porque este gulp exporta multiples funciones
// cuando no las tenga es porque solo exporta una funcion va. 
//La funcion src encuentra un archivo y la funcion dest te permite guardarlo en disco va.

const sass = require('gulp-sass')(require('sass')); //gulp-sass solo compila esa hoja de estilos
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

function css(  done ) {
    // Compilar pasos
    // Paso 1: Identificar archivo, 2. Compilarla, 3. Guardar el .css

    src('src/scss/app.scss')
        .pipe( sass(  ) )
            .pipe(postcss([autoprefixer () ] ) )  //Para crear codigo que será soportado por otros navegadores
            .pipe( dest('build/css') );

    done();
}

function imagenes() {
    return src( 'src/img/**/*' )
        .pipe( dest( 'build/img' ) );
}

function dev() {
    watch( 'src/scss/**/*.scss', css );  //Para tener monitoreada toda la carpeta
    watch( 'src/img/**/*', imagenes );
}



exports.css = css; 
exports.dev = dev;
exports.imagenes = imagenes;
exports.default = series(  imagenes, css, dev );


// Series - Se inicia una tarea y hasta que finaliza inicia la siguiente
// Parallel - Todas inician al mismo tiempo 