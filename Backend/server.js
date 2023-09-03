import express from "express";
import cors from "cors"
import fs from "fs/promises"
const app = express();
app.use(express.json());
app.use(cors());

