const express = require('express')
const path = require("path")
const hbs = require('hbs')
require("./db/conn")
const Register = require("./models/registers")


const app = express()
const port = process.env.PORT || 3000


const static_path = path.join(__dirname, "../public")

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(express.static(static_path))
app.set("view engine","hbs")
app.get("/",(req,res)=>{
    res.render("index")
})
app.get("/login",(req,res)=>{
    res.render("login")
})

app.get("/register",async (req,res)=>{
    res.render("register")
})
const createDocument = async ({name,email,phone,age,state,city,pincode,userid,password})=>{
      try{
        const user1 = new Register({
            name,
            email,
            phone,
            age,
            state,
            city,
            pincode,
            userid,
            password
        })

        const result = await Register.insertMany([user1])
        return result
      }catch(err){
          console.log(err);
          return null
      }
}


app.post("/register",(req,res)=>{
   try{
       const name = req.body.name
       const email = req.body.email
       const phone = req.body.phone
       const age = req.body.age
       const state = req.body.state
       const city = req.body.city
       const pincode = req.body.pincode
       const userid = req.body.userid
       const password = req.body.password

       const data ={
           name,
           email,
           phone,
           age,
           state,
           city,
           pincode,
           userid,
           password
       }
       const inserted_res= createDocument(data)
       if(inserted_res){
           res.render("index")
       }else{
           res.render("404")
       }

   }catch(err){
       res.status(400).send(err)
   }

})
app.post('/login',async(req,res)=>{
    try{
       let userid = req.body.userid
       const password = req.body.password
        
       const user_info= await Register.findOne({userid:"ankit1250"},
        (err, data) => {
            if(err) console.log(err)
        })
       console.log(user_info)
       

    }catch(err){
        console.log(err)
    }
})
app.listen(port,()=>{
    console.log("Connection done.",`The server is running at port no. ${port}`)
})