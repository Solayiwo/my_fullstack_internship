const express = require("express");
const cors = require("cors");

const app = express();

const port = 4500;

app.use(express.json());
app.use(cors());

const formRoute = require("./routes/formRoutes");

app.use("/form", formRoute);

app.get("/", (req, res) => {
  res.send("Server Started Successfully");
});

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0:${port}`);
});
