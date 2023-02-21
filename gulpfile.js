const { src, dest, watch} = require('gulp');   //Las llaves después de const es porque este gulp exporta multiples funciones
// cuando no las tenga es porque solo exporta una funcion va. 
//La funcion src encuentra un archivo y la funcion dest te permite guardarlo en disco va.

const sass = require('gulp-sass')(require('sass')); //gulp-sass solo compila esa hoja de estilos

function css(  done ) {
    // Compilar pasos
    // Paso 1: Identificar archivo, 2. Compilarla, 3. Guardar el .css

    src('src/scss/app.scss')
        .pipe( sass(  {outputStyle: 'expanded'}  ) )
            .pipe( dest('build/css') )

    done();
}

function dev() {
    watch( 'src/scss/app.scss', css ); 
}

exports.css = css; 
exports.dev = dev;