var mongoose = require('mongoose');
var async = require('async');
var conn = mongoose.connect('mongodb://127.0.0.1/vaibhav');
var post_schema = mongoose.Schema({},{
    strict: false,
    collection: 'pqr'
});

var post = conn.model('post', post_schema);
var records = [];
for (var i = 0; i < 10; i++)
{
    records.push({
        "name": 'vaibhav',
        'dob': '21-12-1994',
    });
 }
// console.log(records);

insertAndNotify(records, function(err)
{
    if (err) {
        console.log(err);
        process.exit();
    }
    console.log('all done!!');
    process.exit();
    //continue all insert is done
});

function insertAndNotify(records, main_callback) 
{
    async.eachLimit(records, 5, function(row, callback) 
    {
        var new_post = new post({
            name: row.name,
            dob: row.dob,
        });
        new_post.save(function(err, row) {
            if (err) {
                console.log(err);
                callback(err);  // calling the callback function
            } else {
                callback();
            }
        });
    }, function(err)
       {
           main_callback(err); // calling the main_callback function
       });
}