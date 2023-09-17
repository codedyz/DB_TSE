import express from 'express'
import cors from 'cors'
import path from 'path'
import morgan from 'morgan'

import indexRoutes from './routes/index.routes.js'
import crearmodelo from './routes/crearmodelo.routes.js'
import cargartmp from './routes/cargartmp.routes.js'
import eliminarmodelo from './routes/eliminarmodelo.routes.js'

import consulta1 from './routes/consulta1.routes.js'
import consulta2 from './routes/consulta2.routes.js'
import consulta3 from './routes/consulta3.routes.js'
import consulta4 from './routes/consulta4.routes.js'
import consulta5 from './routes/consulta5.routes.js'
import consulta6 from './routes/consulta6.routes.js'
import consulta7 from './routes/consulta7.routes.js'
import consulta8 from './routes/consulta8.routes.js'
import consulta9 from './routes/consulta9.routes.js'
import consulta10 from './routes/consulta10.routes.js'
import consulta11 from './routes/consulta11.routes.js'


const app = express()
const __filename = new URL(import.meta.url).pathname;
export const __dirname = path.dirname(__filename);

//settings
app.set('case sensitive routing', true)
app.set('view engine','ejs')
app.set('views',path.join(__dirname, 'views'))

//middlewares
app.use(cors())
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')))

//routes
app.use(indexRoutes)
app.use(crearmodelo)
app.use(cargartmp)
app.use(eliminarmodelo)

app.use(consulta1)
app.use(consulta2)
app.use(consulta3)
app.use(consulta4)
app.use(consulta5)
app.use(consulta6)
app.use(consulta7)
app.use(consulta8)
app.use(consulta9)
app.use(consulta10)
app.use(consulta11)


app.listen(3000)
console.log('Server On Port:', 3000)