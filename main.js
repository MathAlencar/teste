const express = require('express')
const routes = require('./route')

const app = express()

// configurando o Body
app.use(express.urlencoded({extended: true}))

app.use(routes)

app.listen(3333, (err) => {
    if(err) return
    else{
        console.log('Rodando..')
    }
})