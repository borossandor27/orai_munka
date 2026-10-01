import express from "express"; // node_modules mappában van!
const app = express();  // példányosítjuk az express-t

app.get("/", (req, res) => {
    res.contentType("text/plain").status(200).send("Hello World!");
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});