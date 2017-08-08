var assert = require('assert');

var {from} = require('linq');
var { properties, provinces } = require('../src/datastores');

describe('it should be create data mass test', function () {
    it('normalize provinces', function (done) {
        var provJson = require('../data/provinces.json');

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

    it('normalize properties', function (done) {
        var propJson = require('../data/properties.json');

        properties.remove({}, {multi: true},()=>{
            
            properties.insert(propJson.properties, (err, docs) => { 
                done(); 
            });

        });

    });

});