const express = require('express');
const db = require('./config/db');
const user = require('./models/user.schema');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({
     extended:
          true
}));
app.use(express.static('public'));

app.get('/', (req, res) => {
     user.find({}).then((data) => {
          console.log(data);
          return res.render('book', {
               user: data
          });
     }).catch((err) => {
          console.log(err);
          return false;
     })

})
app.get('/addBook',(req,res)=>{
     res.render('addBook');
})
app.post('/insertData', (req, res) => {
     const { name, authorName, image, dsc, id } = req.body;
     if (id) {
          user.findByIdAndUpdate(id, { name, authorName, image, dsc }).then((data) => {
               console.log("data update");
               return res.redirect('/')
          }).catch((err) => {
               console.log(err);
          })
     } else {
          user.create({
               name,
               authorName,
               image,
               dsc
          }).then((data) => {
               // console.log(data);
               // console.log("Data inserted..");
               return res.redirect('/');
          }).catch((err) => {
               console.log(err);
               return false;
          })
     }

})
app.get('/editData/:_id', (req, res) => {
     const id = req.params;

     console.log(id)
     user.findById(id)
          .then((data) => {

               console.log("Data updated..");
               return res.render('edite', { data });
          })

          .catch((err) => {
               console.log(err);
               return false;
          });
});


app.get('/deleteData/:id', (req, res) => {
     let {id} = req.params;

 

     console.log(id);

     user.findByIdAndDelete(id).then((data) => {
          console.log("Data deleted..");
          return res.redirect('/');
     }).catch((err) => {
          console.log(err);
          return false;
     })

});
app.listen(8180, (err) => {
     if (!err) {
          console.log("server Started on port http://localhost:8180");
     }
})