'use strict';

var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');


var Generator = module.exports = function Generator() {
    ScriptBase.apply(this, arguments);
    this.hookFor('angular-ui-router:controller');
    this.hookFor('angular-ui-router:view');
};

util.inherits(Generator, ScriptBase);

Generator.prototype.rewriteAppJs = function () {
    if (this.env.options.coffee) {
        angularUtils.rewriteFile({
            file: path.join(this.env.options.appPath, 'scripts/app.coffee'),
            needle: '/*needle-point*/',
            splicable: [
              '.state \'/' + this.name + '\',',
              '  templateUrl: \'views/' + this.name + '.html\',',
              '  controller: \'' + this._.classify(this.name) + 'Ctrl\''
            ]
        });
    }
    else {
        angularUtils.rewriteFile({
            file: path.join(this.env.options.appPath, 'scripts/app.js'),
            needle: '/*needle-point*/',
            splicable: [
              '.state(\'/' + this.name + '\', {',
              '  templateUrl: \'views/' + this.name + '.html\',',
              '  controller: \'' + this._.classify(this.name) + 'Ctrl\'',
              '})'
            ]
        });
    }
};
