goog.provide('application.Datasource');

goog.require('goog.global');

application.Datasource = function() {
    this.appName = 'testing';
}

application.Datasource.prototype.fetch = function() {
    goog.global.console.log('Fetching data');
}
