import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB";
import cookieParser from "cookie-parser";
import cors from "cors";
import UserRoutes from "./routes/userRoutes";
import FlatRoutes from "./routes/flatRoutes";
import ExpenseRoutes from "./routes/expenseRoutes";
import ExpenseSlipRoutes from "./routes/expenseSlipRoutes";
import MaintenanceSlipRoutes from "./routes/maintenanceSlipRoutes";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/flats", FlatRoutes);
app.use("/api/v1/expenses", ExpenseRoutes)
app.use("/api/v1/expensesslip", ExpenseSlipRoutes)
app.use("/api/v1/maintenanceslip", MaintenanceSlipRoutes)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
