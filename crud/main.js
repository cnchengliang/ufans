define(function (require) {
    var $ = require('jQuery'),
        _ = require('Underscore'),
        Backbone = require('Backbone'),
        Router = require('./router/main');


    $(function () {
        Router.initialize();
    });
});

