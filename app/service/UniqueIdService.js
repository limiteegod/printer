var db = require('../config/Database.js');
var table = db.get("uniqueId");

var UniqueIdService = function(){};

/**
 * check msg is exists or not
 * @param uniqueId
 */
UniqueIdService.prototype.exists = function(uniqueId, cb)
{
    table.save({_id:uniqueId}, function(err, data){
        cb(err, data);
    });
};

module.exports = new UniqueIdService();