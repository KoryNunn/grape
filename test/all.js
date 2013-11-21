var grape = require('../');

grape('doesn\'t explode', function(t){
    t.plan(1);

    t.pass('passed');
});

grape('t.ok', function(t){

    t.plan(1);

    t.ok('ok', true);
});

grape('t.end ok', function(t){

    t.plan(2);

    t.ok(true, 'ok');

    t.ok(true, 'ok');

    t.end('ok');
});

grape('t.end not ok', function(t){

    t.plan(2);

    t.ok(true, 'ok');

    t.end('ok');

    t.ok(true, 'ok');
});

grape('plan != count', function(t){

    t.plan(2);

    t.ok(true, 'ok');
});

grape('error', function(t){

    t.plan(1);

    // throw an error
    a.b = c;

    t.ok(true, 'ok');
});