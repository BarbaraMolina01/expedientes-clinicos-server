import app from './app.js'
import { PORT } from './lib/index.js'

app.listen(PORT, () => {
  console.log(`Server on port http://localhost:${PORT}`)
})
