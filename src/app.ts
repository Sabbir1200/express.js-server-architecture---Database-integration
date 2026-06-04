import express, {
  type Application,
  type Request,
  type Response,
} from "express";



import { userRoute } from "./modules/users/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";
import logger from "./middleware/logger";
import CookieParser from "cookie-parser";

const corsOptions = {
  origin: 'http://localhost:5000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
import cors from "cors"
import { globalErrorHandler } from "./middleware/globalErrorHandler";

const app: Application = express();

app.use(CookieParser())
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use(logger);
app.use(cors())



app.get("/", (req: Request, res: Response) => {
  // res.send('Hello World!')
  res.status(200).json({
    message: "Express Server",
    author: "Sabbir Hossain",
  });
});

app.use("/api/users", userRoute);
app.use("/api/profile", profileRoute);
app.use("/api/auth",authRoute)





// Global Error Handling Middleware
app.use(globalErrorHandler);



export default app;