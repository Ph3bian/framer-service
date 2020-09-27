import request from "supertest";
import fs from "fs";
import app from "../index";

describe("GET / ", () => {
  test("test should display welcome message", async () => {
    const {
      body: { message, status },
    } = await request(app).get("/");
    expect(message).toBe("Hello from Photo Framer Service");
    expect(status).toBe(200);
  });
});

describe("GET /<wrong route> ", () => {
  test("test invalid route", async () => {
    const { body } = await request(app).get("/wrong-route");
    const { status, error } = body;
    expect(error).toBe("Route not found");
    expect(status).toBe(404);
  });
});

describe("POST /upload ", () => {
  test("test generate merge photo fails", async () => {
    const { body } = await request(app).post("/upload", { image: "hello" });
    const { status, error } = body;
    expect(error).toBe("");
    expect(status).toBe(500);
  });

  // test("test generate merge photo successful", async () => {
  //   const { body } = await request(app).post("/upload", { image: "hello" });
  //   const { status, error } = body;
  //   expect(error).toBe("");
  //   expect(status).toBe(500);
  // });
});
