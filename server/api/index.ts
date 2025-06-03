import serverless from "serverless-http";
import app from "../src/app";  

export default serverless(app);