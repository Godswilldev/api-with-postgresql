import { config } from "dotenv";
import app from "./app";

config();

const PORT: string = process.env.LOCAL_HOST_PORT || "8900";
const HOST: string = process.env.LOCAL_HOST || "localhost";

app.listen(PORT, () => console.log(`starting app on: http://${HOST}:${PORT}`));
