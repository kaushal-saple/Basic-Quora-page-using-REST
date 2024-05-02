const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

let port = 8080;

app.listen(port,()=>{
    console.log(`listening to server port:${port}`);
})

let posts = [
    {
        id:uuidv4(),
        username:"Kaushal",
        content:"hey Quora!!, i am trying to learn RESTful API",
        sN:1
    },
    {
        id:uuidv4(),
        username:"Ravi",
        content:"Working at Jio is an amazing and joyful experience",
        sN:2
    },
    {
        id:uuidv4(),
        username:"Rohit",
        content:"when i was captaion for MI, Everything was better"
    }
];

app.get("/posts",(req,res)=>{
    // console.log("you are on all post page");
    res.render("index.ejs",{posts});
});


app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
    let {username,content} = req.body;
    let id = uuidv4()
    posts.push({id, username,content});
    if(username == "kaushal" && content =="saple"){
        let posts = posts.filter((el) => el.sN == 1);
        // console.log(newp);
        res.render("index.ejs",{posts});
    }
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((el)=> id===el.id);
    console.log(post);
    res.render("show.ejs",{post});
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id===p.id);
    res.render("edit.ejs",{post});
})

app.patch("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let new_content = req.body.content;
    let post = posts.find((p)=>id===p.id);
    post.content = new_content;
    console.log(post);
    res.redirect("/posts");
});

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=> id!== p.id);
    res.redirect("/posts");
})
