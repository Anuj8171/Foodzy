import express, { Request, Response } from "express";
import path from "path";
import authRouter from "./routes/auth.route";
import productRouter from "./routes/product.routes";
import cors from "cors";

const app = express();


const port = process.env.PORT || 5000;

app.use(cors({
  credentials: true
}));

app.use("/images", express.static(path.resolve(__dirname, "../public/images")));

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
