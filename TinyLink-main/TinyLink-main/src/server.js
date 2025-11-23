
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/linkRoutes.js";

dotenv.config();

const app = express();


app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://tinylink-frontend-qvo3.onrender.com" 
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
}));

app.use(express.json());


app.get("/healthz", (req, res) => {
  res.json({ ok: true });
});


app.use("/", router);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));