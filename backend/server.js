const express = require("express");
const cors = require("cors");
const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.use("/api/tasks", require("./routes/tasks"));

app.listen(4000, () => console.log("Server running"));