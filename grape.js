var deepEqual = require('deep-equal');

var nextTick = setImmediate || process.nextTick;

function instantiate(){
    var testsToRun = [],
        testsRun = [],
        totalTests = 0,
        totalAssersions = 0,
        completedAssersions = 0,
        begun = false,
        timeout = 0;

    function runNextTest(){
        while(testsToRun.length){
            var nextTest = testsToRun.shift();
            nextTest._run();
            testsRun.push(nextTest);
        }
    }

    function complete(){
        var results = [];

        if(testsToRun.length !== totalTests){
            // tests level problem
        }

        for(var i = 0; i < testsRun.length; i++) {
            var test = testsRun[i];

            if(test._assersions.length !== test._count){
                // test level problem
            }

            results.push.apply(results, test._assersions);

        }

        // ToDo print results
        console.log(results);
    }

    function begin(){
        if(!begun){
            begun = true;
            nextTick(runNextTest);
            nextTick(function(){
                if(typeof process === 'undefined'){
                    setTimeout(complete, timeout);
                }else{
                    process.on('exit', complete);
                }
            });
        }
    }

    function grape(name, testFunction){
        totalTests++;
        testsToRun.push(new Test(name, testFunction));
        begin();
    }

    function Test(name, testFunction){
        this._expectedCount = 0;
        this._count = 0;
        this._assersions = [];
        this.name = name;
        this._testFunction = testFunction;
    }

    Test.prototype.timeout = function(time){
        timeout = Math.max(timeout, time);
    };

    Test.prototype.plan = function(count){
        this._expectedCount = count;
    };

    Test.prototype._run = function(){
        this._testFunction(this);
    };

    Test.prototype._assert = function(details){
        this._count++;
        this._assersions.push(details);
    };

    Test.prototype.pass = function(message){
        this._assert({
            ok: true,
            message: message,
            assersionName: 'pass'
        });
    };

    Test.prototype.ok = function(value, message){
        this._assert({
            actual: value,
            ok: !!value,
            message: message,
            assersionName: 'ok'
        });
    };

    Test.prototype.notOk = function(value, message){
        this._assert({
            actual: value,
            ok:!value,
            message: message,
            assersionName: 'notOk'
        });
    };

    Test.prototype.equal = function(value, expected, message){
        this._assert({
            actual: value,
            expected: expected,
            ok:value === expected,
            message: message,
            assersionName: 'notOk'
        });
    };

    Test.prototype.deepEqual = function(value, expected, message){
        this._assert({
            actual: value,
            expected: expected,
            ok: deepEqual(value, expected, { strict: true }),
            message: message,
            assersionName: 'deepEqual'
        });
    };

    Test.prototype.deepLooseEqual = function(value, expected, message){
        this._assert({
            actual: value,
            expected: expected,
            ok: deepEqual(value, expected),
            message: message,
            assersionName: 'deepLooseEqual'
        });
    };

    Test.prototype.notDeepEqual = function(value, expected, message){
        this._assert({
            actual: value,
            expected: expected,
            ok: !deepEqual(value, expected, { strict: true }),
            message: message,
            assersionName: 'notDeepEqual'
        });
    };

    Test.prototype.notDeepLooseEqual = function(value, expected, message){
        this._assert({
            actual: value,
            expected: expected,
            ok: !deepEqual(value, expected),
            message: message,
            assersionName: 'notDeepLooseEqual'
        });
    };

    Test.prototype['throws'] = function (fn, expected, message) {
        var caughtError,
            passed;

        if(typeof expected === 'string'){
            message = expected;
            expected = undefined;
        }

        try{
            fn();
        }catch(error){
            caughtError = {error: error};
        }

        passed = caughtError;

        if(expected instanceof RegExp){
            passed = expected.test(caughtError && caughtError.error);
            expected = String(expected);
        }

        this._assert({
            ok: passed,
            message : message || 'should throw',
            assersionName : 'throws',
            actual : caughtError && caughtError.error,
            expected : expected,
            error: !passed && caughtError && caughtError.error
        });
    };

    Test.prototype.doesNotThrow = function (fn, expected, message) {
        var caughtError;

        if(typeof expected === 'string'){
            message = expected;
            expected = undefined;
        }

        try{
            fn();
        }catch(error){
            caughtError = { error : err };
        }

        this._assert({
            ok: !caughtError,
            message: message || 'should not throw',
            operator: 'doesNotThrow',
            actual: caughtError && caughtError.error,
            expected: expected,
            error: caughtError && caughtError.error
        });
    };

    grape.createNewInstance = instantiate;

    return grape;
}

module.exports = instantiate();