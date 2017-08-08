var assert = require('assert');

var {from} = require('linq');
var { properties, provinces } = require('../src/datastores');

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function doOverlap(l1,r1,l2,r2){
    // If one rectangle is on left side of other
    if (l1.x > r2.x || l2.x > r1.x)
        return false;
 
    // If one rectangle is above other
    if (l1.y < r2.y || l2.y < r1.y)
        return false;
 
    return true;
}

function generateRandomProperty(provincesArr) {
    var p = {
        "x": getRandomIntInclusive(0, 1400),
        "y": getRandomIntInclusive(0, 100),
        "title": "Imóvel código 1, com 5 quartos e 4 banheiros",
        "price": 1250000,
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "beds": 4,
        "baths": 3,
        "squareMeters": 210, 
        
        
    };

    // p.provinces = from(provincesArr)
    //                  .where((prov)=>{
    //                     console.log(`console.log(doOverlap({x: ${p.x}, y: ${p.y}}, {x: ${1400 - (p.x+1)}, y: ${1000- (p.y+1)}}, {x: ${prov.boundaries.upperLeft.x}, y: ${prov.boundaries.upperLeft.x}} , {x: ${prov.boundaries.bottomRight.x}, y: ${prov.boundaries.bottomRight.y}}));`)

    //                      return doOverlap(
    //                          {x: p.x, y: p.y}, 
    //                          {x: 1400 - (p.x+1), y: 1000- (p.y+1)},
    //                          prov.boundaries.upperLeft, 
    //                          prov.boundaries.bottomRight
    //                     );
    //                   })
    //                  .select("$.name")
    //                  .toArray();
    return p;
};
describe('it should be create data mass test', function () {
    it('normalize provinces', function (done) {
        var provJson = {
            "Gode": { "boundaries": { "upperLeft": { "x": 0, "y": 1000 }, "bottomRight": { "x": 600, "y": 500 } } },
            "Ruja": { "boundaries": { "upperLeft": { "x": 400, "y": 1000 }, "bottomRight": { "x": 1100, "y": 500 } } },
            "Jaby": { "boundaries": { "upperLeft": { "x": 1100, "y": 1000 }, "bottomRight": { "x": 1400, "y": 500 } } },
            "Scavy": { "boundaries": { "upperLeft": { "x": 0, "y": 500 }, "bottomRight": { "x": 600, "y": 0 } } },
            "Groola": { "boundaries": { "upperLeft": { "x": 600, "y": 500 }, "bottomRight": { "x": 800, "y": 0 } } },
            "Nova": { "boundaries": { "upperLeft": { "x": 800, "y": 500 }, "bottomRight": { "x": 1400, "y": 0 } } }
        };

        var arr = [];
        for (var provinceName in provJson) {
            if (!provJson.hasOwnProperty(provinceName)) continue;

            var province = provJson[provinceName];
            var prov = Object.assign({name: provinceName}, province);
            arr.push(prov);
        }

        provinces.remove({}, {multi: true},()=>{
            
            provinces.insert(arr, (err, docs) => { done(); });

        });

    });
    
    it('test generate random property', function(done){
        
        var p = generateRandomProperty(provinces.getAllData());
        // if(!p.provinceName){
        //     assert.fail(!p.provinceName, true, 'The field `provinceName` was not filled.');
        // }else{
        //     assert.ok(!!p.provinceName, 'Province has founded!');
        // }
        done();
    });


    it('creating random data', function (done) {
        var arr = [];
        for (var i = 0; i < 1000; i++) {
            var property = generateRandomProperty();
            arr.push(property);
        }
        properties.remove({}, {multi: true}, ()=>{
            properties.insert(arr, (err, docs) => {
                if (err) assert.fail(err);

                done();
            });
        });
    });
});