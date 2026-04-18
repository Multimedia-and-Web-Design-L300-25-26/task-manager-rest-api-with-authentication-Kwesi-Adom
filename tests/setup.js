import dotenv from "dotenv";
import mongoose from "mongoose";
import { jest } from "@jest/globals";
import connectDB from "../src/config/db.js";

dotenv.config();
jest.setTimeout(30000);

beforeAll(async () => {
	await connectDB();
	await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
	await mongoose.connection.close();
});