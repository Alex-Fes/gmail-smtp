const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()


app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const port = process.env.PORT || 3000
const smtp_login = process.env.SMTP_LOGIN || '---'
const smtp_password = process.env.SMTP_PASSWORD || '---'

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: smtp_login, // generated ethereal user -> 'southpiter@gmail.com'
        pass: smtp_password, // generated ethereal password -> 'vhzgpakhpshiqysi'
    },
});

app.get('/', (req, res) => {
    res.send(`I'm working!`)
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

    res.send('Letter has been sent!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})