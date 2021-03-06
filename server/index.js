import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes";
import asyncWrapper from "./middleware/asyncWrapper";

const app = express();

app.use(cors());
app.options("*", cors());

app.use(bodyParser.json({ limit: "50mb" }));
const port = 5000;

app.get("/", (_, res) =>
  res
    .status(200)
    .json({
      success: true,
      status: 200,
      message: "Hello from Photo Framer Service",
    })
);
app.use("/", asyncWrapper(router));
app.all("*", (_, res) =>
  res.status(404).json({ status: 404, error: "Route not found" })
);
app.listen(process.env.PORT || port);

export default app;
