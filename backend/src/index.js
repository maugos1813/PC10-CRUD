import express from 'express'
import morgan from 'morgan'
import { PORT } from './config/config.js'
import usuariosRoutes from './routes/usuarios.routes.js'
import swaggerUi from 'swagger-ui-express'
import jsonDocs from './config/swagger-output.json' assert { type: 'json' }

const app = express()

app.use(express.json()) // Permite que express lea json
app.use(morgan('dev'))

app.use('/api/usuarios', usuariosRoutes)

app.use('/documentation', swaggerUi.serve, swaggerUi.setup(jsonDocs))

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
