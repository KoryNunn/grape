var deepEqual = require('deep-equal');

var testsToRun = [],
    testsRun = [],
    totalAssersions = 0,
    completedAssersions = 0,
    begun = false;

function runNextTest(){
    while(tests.length){
        var nextTest = testsToRun.shift();
        nextTest._run();
        testsRun.push(nextTest);
    }
}

function queueTestRun(){
    if(!testsToRun.length){
        setTimeout(runNextTest, 100);
    }
}

function complete(){
    if(
}

function begin(){
    if(!begun){
        begun = true;
        process.on('exit', function(){
            complete();
        });
    }
}

function test(name, callback){
    testsToRun.push(new Test(name, callback));
    queueTestRun();
    begin();
}

function Test(name, callback){
    this._expectedCount = 0;
    this._count = 0;
    this._assersions = [];
    this.name = name;
    this.callback = callback;
}

Test.prototype._timeout = 10;

Test.prototype.plan = function(count){
    this._expectedCount = count;
};

Test.prototype._run = function(){
    this.callback(this);
    this.setTimeout(function(){

    }this._timeout);
};

Test.prototype._assert = function(details){
    this._count++;
    this._assersions.push(details);
};

Test.prototype.pass = function(message){
    this._assert({
        actual: true,
        expected: true,
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