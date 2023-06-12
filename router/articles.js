const express = require('express');
const router = express.Router();
const Article = require('./../models/articles');

//CREATE new article
router.get('/new',(req,res)=>
{
    res.render('articles/new',{article: new Article()})
}
)
router.get('/edit/:id',async(req,res)=>
{
    let article = await Article.findById(req.params.id)
    res.render('articles/edit',{article: article})
}
)


router.get('/:id',async (req,res)=>{
     const article = await Article.findById( req.params.id)
     if(article==null)res.redirect('/')
     res.render('articles/show',{article : article})
})
//POST
router.post('/',async(req,res) =>
{
    //console.log("heloo")
       // express.response.write(req);
        let article = new Article({ 
        title : req.body.title,
        description : req.body.description,
        markdown : req.body.markdown

    });
   try{
    article = await article.save()
    res.redirect(`/articles/${article.id}`);
   } 
   catch(e)
   {
    console.log(e);
    res.render(`articles/new`,{article : article})
   }
})

router.delete('/:id',async(req,res)=>
{
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/');
})

 router.put('/:id',async(req,res)=> {
    let article;
  try {
    article = await Article.findById(req.params.id);
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;
    article = await article.save();
    res.redirect(`/articles/${article.id}`);
  } catch (e) {
    console.log(e);
    if (article == null) {
      res.redirect('/');
    } else {
      res.render('articles/edit', { article: article });
    }
  }

    })





module.exports = router;