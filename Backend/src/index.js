// const express = require("express")
import express from "express";

const app = express();

app.use("/api/auth", authRouter);

app.listen(5001, () => {
    console.log("Server is running on port 5001");
})