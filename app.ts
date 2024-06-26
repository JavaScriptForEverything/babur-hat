import type { Express } from 'express'
import path from 'node:path'
import crypto from 'node:crypto'
import express from 'express'
import cors from 'cors'
import passport from 'passport'

import session from 'express-session'
import MongoStore from 'connect-mongo'
import routers from './routes'
import * as errorController from './controllers/errorController'
import { passportConfig } from './controllers/passportConfig'
import { dbConnect } from './models/dbConnect'

dbConnect() 		// also add dotenv.config()
errorController.exceptionErrorHandler() // put it very top

const { SESSION_SECRET,  MONGO_HOST } = process.env || {}
const publicDirectory = path.join(process.cwd(), 'public')


// MONGO_HOST required into session({ store })
const DATABASE_URL = `mongodb://${MONGO_HOST}/babur-hat`
if(!MONGO_HOST) throw new Error(`Error => MONGO_HOST: ${MONGO_HOST}`)
if(!SESSION_SECRET) throw new Error(`Error: => SESSION_SECRET=${SESSION_SECRET}`)


const app: Express = express()

// any pug file got cspNonce variable as global built-in has
app.use((_req, res, next) => {
	res.locals.cspNonce = crypto.randomBytes(16).toString('hex')
	next()
})


app.use(cors({ 
	origin: "*",
	credentials: true,
}))
app.use(express.static( publicDirectory ))
app.use(express.urlencoded({ extended: false })) 						// required for passport login formData
app.use(express.json({ limit: '10mb' }))
app.set('view engine', 'pug')



// Step-1: set session
app.use(session({
	secret: SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	store: MongoStore.create({ mongoUrl: DATABASE_URL })
}))

// Step-2: attach session with passport
app.use(passport.initialize())
app.use(passport.session())


// Step-3: passport.use(new LocalStrategy(...))
// Step-4: serializeUser + deserializeUser
passportConfig()

// Step-5: app passport.authenticate('local', {...}) 	on 	`POST /login` route



app.use('/', routers)

app.all('*', errorController.routeNotFound)
app.use(errorController.globalErrorHandler)

export default app