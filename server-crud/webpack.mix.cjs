// webpack.mix.js

const mix = require('laravel-mix');
// import mix from 'laravel-mix';

mix
.js('src/js/app.js', 'public')
.sass('src/sass/style.scss', 'public');