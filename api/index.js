import express from "express";
import usersRouter from "../routes/users.js";

const app = express();
app.use(express.json());

// routes
app.use("/users", usersRouter);

// default route
app.get("/", (req, res) => {
  res.send("Backend Transzity API is running on Vercel 🚀");
});

if(process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

export default app;
