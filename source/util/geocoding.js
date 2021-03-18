var request = require('postman-request')

var geocode = (address,callback)=>{
    var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoicmFtc2hhZGFrMzY5IiwiYSI6ImNrbThyZGtzYjFhdTQydnAxcmc3bGl3YnoifQ.uCiR6dppr-cOTzhOfN651w&limit=1"
request({url, json : true},(err,{body})=>{
    if(err){
        callback("server error",undefined);
    }
    else if(body.features.length==0){
        callback("client error",undefined);
    }
    else{
        callback(undefined,{longitude:body.features[0].center[0],
            latitude:body.features[0].center[1],location:body.features[0].place_name});
    }
})
}
module.exports = geocode 