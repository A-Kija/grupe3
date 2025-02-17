// webpack.mix.js

const mix = require('laravel-mix');

mix
.js('src/js/app.js', 'public')
.sass('src/sass/style.scss', 'public')
.copy('src/*.html', 'public');