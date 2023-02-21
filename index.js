const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()


app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const port = 3000

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'southpiter@gmail.com', // generated ethereal user
        //pass: 'dx8Zna0bJR', // generated ethereal password
        pass: 'vhzgpakhpshiqysi', // generated ethereal password
    },
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/sendMessage', async (req, res) => {

    let {name, email, message} = req.body

    let info = await transporter.sendMail({
        from: 'HR WANTS YOU!!!', // sender address
        to: "aleksei.fesenko86@gmail.com", // list of receivers
        subject: "From portfolio", // Subject line

        html: `<b>Message from Portfolio</b> 
                <div>
                    ${name}
                </div>
                <div>
                    ${message}
                </div>
                <div>
                    ${email}
                </div>
`, // html body
    });

    res.send('Letter was send!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})