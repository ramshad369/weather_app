var request = require('postman-request')
var weather = (longitude,latitude,callback)=>{
    var url = "http://api.weatherstack.com/current?access_key=8a38cda525284e5b0cc1aeb99cef10d7&query="+encodeURIComponent(longitude)+","+encodeURIComponent(latitude)

request({url, json : true}, (err,{body})=>{
    if(err){
        callback("server error",undefined);
    }
    else if(body.error){
        callback("client error",undefined);
    }
    else{
        callback(undefined,body.current.weather_descriptions);
    }
    
})
}
module.exports = weather