const express       =   require('express')
const ejs           =   require('ejs')
const path          =   require('path')
const bodyParser    =   require('body-parser')
const app           =   express()
const adminRoutes   =   require('./routes/admin')
const userRoutes    =   require('./routes/user')
const sequelize     =   require('./utils/mysql')
const Users         =   require('./model/user')
const Product       =   require('./model/movieList')

app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use((req,res,next)=>{
    Users.findByPk(2)
    .then(user =>{
        req.user=user
        next()
    })
    .catch(err => console.log(err))
})
app.use('/',adminRoutes)
app.use('/admin',adminRoutes)
app.use('/',userRoutes)

Product.belongsTo(Users,{constraints:true,onDelete:'CASCADE'})
Users.hasMany(Product)

sequelize
.sync()
.then(result =>{
    return Users.findByPk(2)
})
.then(user =>{
    if(!user)
    {
    return Users.create({name:"Arpita",email:"arpita003@gmail.com"})
    }
    return user
})
.then(user =>{
    app.listen(5000);
})
.catch(err => console.log(err))