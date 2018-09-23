import MatchersUtil = jasmine.MatchersUtil;
import CustomMatcherFactories = jasmine.CustomMatcherFactories;
import CustomEqualityTester = jasmine.CustomEqualityTester;
import CustomMatcher = jasmine.CustomMatcher;
import CustomMatcherResult = jasmine.CustomMatcherResult;

export const toBeArray: CustomMatcherFactories = {
    toBeArray: () => {
        return {
            compare: (value) => {
                if (Array.isArray(value)) {
                    return { pass: true };
                } else {
                    return { pass: false, message: `${value} is not an array but ${typeof value}` };
                }
            }
        };
    }
};

export const toBeNumber: CustomMatcherFactories = {
    toBeNumber: () => {
        return {
            compare: (value) => {
                if (Number.isInteger(value)) {
                    return { pass: true };
                } else {
                    return { pass: false, message: `${value} is not a number but ${typeof value}` };
                }
            }
        };
    }
};

export const toBeString: CustomMatcherFactories = {
    toBeString: () => {
        return {
            compare: (value) => {
                if (typeof value === 'string' || value instanceof String) {
                    return { pass: true };
                } else {
                    return { pass: false, message: `${value} is not a string but ${typeof value}` };
                }
            }
        };
    }
};

export const toBeBoolean: CustomMatcherFactories = {
    toBeBoolean: () => {
        return {
            compare: (value) => {
                if (typeof (value) === typeof (true)) {
                    return { pass: true };
                } else {
                    return { pass: false, message: `${value} is not a boolean but ${typeof value}` };
                }
            }
        };
    }
};

export const toBeInstanceOf: CustomMatcherFactories = {
    toBeInstanceOf: function () {
        return {
            compare: (model) => {
                const actual = this.actual,
                    notText = this.isNot ? ' not' : '';
                this.message = function () {
                    return 'Expected ' + actual + notText + ' to be an instance of ' + model;
                };
                return { pass: (actual instanceof model) };
            }
        };
    }
};


