var gulp = require('flarum-gulp');

gulp({
    modules: {
        'flagrow/user-directory': [
            '../lib/**/*.js',
            'src/**/*.js'
        ]
    }
});
