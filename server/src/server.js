import "dotenv/config";
import express from "express";
import path from "path";

import discussionRouter from "./routes/discussionRoutes.js";
import authRouter from "./routes/authRoutes.js";
import commentRouter from "./routes/commentRoutes.js";
import authMiddleware from "./middleware/auth.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

/* ---------- API ROUTES FIRST ---------- */

const __dirname = path.resolve();
const frontendPath = path.join(__dirname, "dist");
app.use(express.static(frontendPath));

app.use("/api/auth", authRouter);
app.use("/api/comment", authMiddleware, commentRouter);
app.use("/api", discussionRouter); // recommend prefixing

app.use((req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});


/* ---------- SERVE FRONTEND ---------- */


/* ---------- REACT ROUTER FALLBACK ---------- */


app.listen(PORT, () => {
  console.log(`Server has started on port: ${PORT}`);
});