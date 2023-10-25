import express from "express"
import qrcode, { toDataURL } from "qrcode"


const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    //res.send("Hello World");
    res.render("index.ejs");
})


// ...
app.get('/submit', (req, res)=>{
    const text = req.query.text; //When there is no input given.
    if(text.length<=0)
    {
        res.render("index.ejs");
    }
    qrcode.toDataURL(text, (err, qrDataURL) => {
        if (err) {
            console.error('Error generating QR code:', err);
            return res.status(500).send('Error generating QR code');
        }
        console.log(text);
        // Respond with an HTML page displaying the QR code
        res.render("submit.ejs", { qrDataURL, text });
    });
})
/*
*/



app.listen(port, (req, res)=>{
    console.log(`Server port ${port} is running`)
})