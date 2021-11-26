import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan"
import indexRouter from "../server/route/index.route.js"
import middlewareService from "../server/middlewareService.js";
import cors from "cors"

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(path.resolve(), 'public')));
app.use(cors());
app.use('/api', indexRouter);
app.use(middlewareService.outputError);

export default app;
