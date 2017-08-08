var Datastore = require('nedb');
var datastores = {
    properties: new Datastore({filename: 'data/properties.nedb', autoload: true}), 
    provinces: new Datastore({filename: 'data/provinces.nedb', autoload: true}), 
};

datastores.properties.ensureIndex({fieldName: 'x'});
datastores.properties.ensureIndex({fieldName: 'y'});
datastores.properties.ensureIndex({fieldName: 'beds'});
datastores.properties.ensureIndex({fieldName: 'baths'});

module.exports = datastores;

