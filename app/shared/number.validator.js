System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var NumberValidator;
    return {
        setters:[],
        execute: function() {
            NumberValidator = (function () {
                function NumberValidator() {
                }
                NumberValidator.rangeHardCoded = function (control) {
                    if (control.value && (isNaN(control.value) || control.value < 1 || control.value > 5)) {
                        return { 'range': true };
                    }
                    return null;
                };
                NumberValidator.range = function (min, max) {
                    return function (control) {
                        if (control.value && (isNaN(control.value) || control.value < min || control.value > max)) {
                            return { 'range': true };
                        }
                        return null;
                    };
                };
                return NumberValidator;
            }());
            exports_1("NumberValidator", NumberValidator);
        }
    }
});
//# sourceMappingURL=number.validator.js.map