import app from './app'
import { AppConfig } from './config/config'
const config = AppConfig.config

const PORT = config.PORT

app.listen(PORT, async () => {
  console.log(`Server up and running on ${PORT}`);
});