const express = require('express')
const app = express();
const Article = require('./models/articles');
const articleRouter = require('./router/articles');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/travelblog',{
    useNewUrlParser : true , useUnifiedTopology :true
 })

app.set('view engine','ejs')


app.use(express.urlencoded({extended : false}))   // access all options from form into the post
app.use(methodOverride('_method'))
app.get('/',async(req,res)=>
{
   const articles = await Article.find().sort({createDate : 'desc'});
    res.render('articles/index',{articles: articles})   // pass the text taken from the html 
})
app.use('/articles',articleRouter);      // use the router
app.listen(5000);