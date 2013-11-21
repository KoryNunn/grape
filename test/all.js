var grape = require('../');

grape('doesn\'t explode', function(t){
    t.plan(1);

    t.pass('passed');
});

grape('t.ok', function(t){
    var grapeInstance = grape.createNewInstance();

    t.plan(1);

    t.ok('ok', true);
});

grape('t.end ok', function(t){
    var grapeInstance = grape.createNewInstance();

    t.plan(2);

    t.ok('ok', true);

    t.ok('ok', true);

    t.end('ok');
});

grape('t.end not ok', function(t){
    var grapeInstance = grape.createNewInstance();

    t.plan(2);

    t.ok('ok', true);

    t.end('ok');

    t.ok('ok', true);
});

grape('plan != count', function(t){
    var grapeInstance = grape.createNewInstance();

    t.plan(2);

    t.ok('ok', true);
});