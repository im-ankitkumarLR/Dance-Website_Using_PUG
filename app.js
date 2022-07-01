 const express =require('express');
 
 const path =require('path');
 const app =express();
 const bodyParser  = require('body-parser');

// Mongoose ko import krna or us se nodejs ko database se connect krna 

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactDance');   // yaha pr apna koi database ka naam rkhlo apne hisaab se phle by default yaha pr test aaya tha 

}


// Defining the Schema 
const contactSchema = new mongoose.Schema({  // ketty schema hata krke aap apne variable bana lo 
  
  name: String,
  email: String,
  phone: String,
  address: String,
  des: String
  // Schema ab baan chuka hai   hamara  iska matbl hai ki apka  or use ye hai apka data hai wo kis formate save hoga 

  /// mongoose ka schema hai wo  jyada tar mySQL ke table ke schema se bahut jyada related hai usi way meye store hoga

  });

// Compiled  Model 

  const contact = mongoose.model('contact', contactSchema);  // variables kaa naam change kr skte ho
// model banane ka mtblba hai hamne ye final kr dia hai ye hamara schema hai or ye ye ye saari cheeze leta hai 
 




 const port =8000;

 const hostname= '127.0.0.1'

 // Express specific stuffs 
 app.use('/static', express.static('static')) // For serving Static files
 
app.use(bodyParser.urlencoded({
    extended: true
  }));


// Pug Related Stuffs 

app.set('view engine','pug') // Set The Template Engine as Pug ----> kon sa view engine use krna chahate hai aap 
app.set('views',path.join(__dirname,'views')) // Set the view directory  ----kon si directory se read krna chahate hai view engine ko ye wahi directory hai


// Endpoints 

app.get('/',(req,res)=>{

    const params= { }

    res.status(200).render('home.pug',params); // home.pug serve ki jayegi phle index.js ko serve kr rhe the hum but ab nhi 
})
app.get('/contact',(req,res)=>{

    const params= { }

    res.status(200).render('contact.pug',params); // home.pug serve ki jayegi phle index.js ko serve kr rhe the hum but ab nhi 
})

app.post('/contact',(req,res)=>{ // agar post request aati hai to saare ke saare parameters lene hai or use server me save kr dene hai  

    var myData = new contact(req.body); // see in notes

    myData.save().then(()=>{// ye save kr dega  or ye save krne ke sath saath ek promise return krega or us promise ko handle krne ke liye // hamko likhna padega .then
      
      res.send("This item has been saved in the database ");



    }).catch(()=>{ // agar koi error aaata hai to respose ne hum ek sms send kr dege  uske liye hum catch use krte hai 

     res.status(400).send(" This item is not saved to the database")


    })

    

    // res.status(200).render('contact.pug'); // home.pug serve ki jayegi phle index.js ko serve kr rhe the hum but ab nhi 
})




// Listening the server 

app.listen(port,hostname,()=>{

    console.log(`Server successfully Listening on http://${hostname}:${port}`)

})




















































