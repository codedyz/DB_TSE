import express from 'express'
import cors from 'cors'
import path from 'path'

import indexRoutes from './routes/index.routes.js'
import consulta1 from './routes/consulta1.routes.js'

const app = express()
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

//settings
app.set('case sensitive routing', true)
app.set('view engine','ejs')
app.set('views',path.join(__dirname, 'views'))

//middlewares
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

//routes
app.use(indexRoutes)
//app.use(consulta1)

app.listen(3000)
console.log('Server On Port:', 3000)