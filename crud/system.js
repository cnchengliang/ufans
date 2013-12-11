define(function (require) {
    var $ = require('jQuery'),
        _ = require('Underscore'),
        Backbone = require('Backbone'),
        Router = require('./router/system');


    $(function () {
        Router.initialize();
    });
});

