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