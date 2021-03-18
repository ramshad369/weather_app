var express = require('express')
var path = require('path')
var hbs = require('hbs')
var geocoding = require('./util/geocoding')
var forecast = require('./util/weatherstack')

var app = express()
var port = process.env.PORT || 3000
//defining path for express config
var publicPath = path.join(__dirname,'../public')
var viewsPath = path.join(__dirname,'../templates/views')
var partialsPath = path.join(__dirname,'../templates/partials')

//setup handebar engine and views location
app.set('views', viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

//serve static files
app.use(express.static(publicPath))

app.get('',(req,res)=>{
    res.render('index',{
        title : 'Fetch Weather',
        name : 'Ramshad'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About page',
        name : "created by ramshad"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title : "Help page!",
        name : "This is where you could get help"
    })
})
app.get("/weather", (req, res)=>{
    if(!req.query.address)
    {
        return res.send({
        title : "error",
        type : "address not found!"
        })
    }
    geocoding(req.query.address,(error, {latitude, longitude, location} = {})=>{
        if(error){
           return res.send({error})
        }
        forecast(latitude, longitude,(error, foredata)=>{
            if(error){
                return res.send({error});
            }
            res.send({
                title : "success!",
                address : req.query.address,
                location:location,
                latitude : latitude,
                longitude : longitude,
                weather : foredata
            })
        })
    })

})

app.get("/help/*",(req,res)=>{
    res.render('404_error',{
        title:'404',
        error_message:"help doc not found!"
    })
})

app.get("*",(req,res)=>{
    res.render('404_error',{
        title:'404',
        error_message:"page not found"
    })
})

app.listen(port,()=>{
    console.log("listening to port"+port);
})