var outerGrape = require('../');

function createTestGrape(){
    var grape = outerGrape.createNewInstance();

    grape.silent = true;
    grape.useTimeout = true;

    return grape;
}

outerGrape('grape pass', function(g){
    var grape = createTestGrape();
    g.plan(1);
    g.doesNotThrow(function(){
        grape('doesn\'t explode', function(t){
            t.plan(1);

            t.pass('passed');
        });
    }, "Grape shouldn't throw an error when called");
});


outerGrape('grape ok', function(g){
    var grape = createTestGrape();
    g.plan(1);

    grape.on('complete', function(){
        g.pass();
    });

    grape('t.ok', function(t){

        t.plan(1);

        t.ok('ok', true);
    });
});

return;
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