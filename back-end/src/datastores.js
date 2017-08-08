var Datastore = require('nedb');
var datastores = {
    properties: new Datastore({filename: 'data/properties.nedb', autoload: true}), 
    provinces: new Datastore({filename: 'data/provinces.nedb', autoload: true}), 
};

module.exports = datastores;

