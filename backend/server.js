const express = require("express");
const app = express();


app.use("/api/tasks", require("./routes/tasks"));

app.listen(4000, () => console.log("Server running"));