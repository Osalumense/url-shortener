import request from "supertest"
import app from "../app"
import { expect } from "chai"
import express from "express"
import { Knex } from "../config/config"

import mysql from "mysql2";

const KnexConfig = Knex.config;
const knex = require("knex")(KnexConfig)

let accessToken: string
describe("Lendsqr endpoints tests", () => {
    before((done) => {
        // Connect to the database
        const connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: ""
        });

        // Drop the database if it exists
        connection.query("DROP DATABASE IF EXISTS lendsqr_test", (err) => {
            if (err) throw err;
            // Create the database
            connection.query("CREATE DATABASE lendsqr_test", (err) => {
                if (err) throw err;
                connection.end((err) => {
                    if (err) throw err;
                    knex.migrate.latest()
                        .then(() => {
                            return knex.seed.run()
                        })
                        .then(() => {
                            done();
                        });
                });
            });
        });

    });

    it("API Loads", (done: any) => {
        request(app)
            .get("/api/v1")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .expect({ message: "Welcome to Lendsqr Assessment API" }, done);
    })

    it("REGISTER a new user", (done) => {
        describe('given  name,email,password.phone', () => {
            request(app)
                .post("/api/v1/auth/register")
                .set("Accept", "application/json")
                .send({
                    "firstName": "John",
                    "lastName": "Doe",
                    "email": "harkugbeostu@gmail.com",
                    "phone": "090934838992",
                    "password": "Stephen@@22"
                })
                .expect("Content-Type", /json/)
                .expect(201)
                .expect((res) => {
                    expect(res.body).to.have.property("status", "success");
                    expect(res.body).to.have.property("message", "User created successfully");
                    expect(res.body).to.have.property("code", 201);
                })
                .end(done);
        })
    });

    it("REGISTER a second user", (done) => {
        describe('given  name,email,password,phone', () => {
            request(app)
                .post("/api/v1/auth/register")
                .set("Accept", "application/json")
                .send({
                    "firstName": "Jane",
                    "lastName": "Doe",
                    "email": "harkugbeosaz@gmail.com",
                    "phone": "090934838999",
                    "password": "Stephen@@22"
                })
                .expect("Content-Type", /json/)
                .expect(201)
                .expect((res) => {
                    expect(res.body).to.have.property("status", "success");
                    expect(res.body).to.have.property("message", "User created successfully");
                    expect(res.body).to.have.property("code", 201);
                })
                .end(done);
        })
    });

    it("Login a user", (done) => {
        describe('given  email,password', () => {
            request(app)
                .post("/api/v1/auth/login")
                .set("Accept", "application/json")
                .send({
                    "email": "harkugbeostu@gmail.com",
                    "password": "Stephen@@22"
                })
                .expect("Content-Type", /json/)
                .expect(200)
                .expect((res) => {
                    expect(res.body).to.have.property("status", "success");
                    expect(res.body).to.have.property("message", "Logged in");
                    console.log("Response:: ", res.body.data)
                    accessToken = res.body.data.accessToken
                    expect(res.body).to.have.property("code", 200);
                })
                .end(done);
        })
    });

    it("Fund a wallet", (done) => {
        describe('given  customer,amount', () => {
            request(app)
            .post('/api/v1/users/fund')
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                "customer": "harkugbeostu@gmail.com",
                "amount": 4000
            })
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((res) => {
                expect(res.body).have.property("status", "success");
                expect(res.body).have.property("message", "Wallet funded");
            }).end(done);
        })
    });

    it("Fund a wallet error", (done) => {
        describe('Missing amount should return error', () => {
            request(app)
            .post('/api/v1/users/fund')
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                "customer": "harkugbeostu@gmail.com"
            })
            .expect("Content-Type", /json/)
            .expect(400)
            .expect((res) => {
                expect(res.body).have.property("error");
            }).end(done);
        })
    });

    it("Transfer from wallet", (done) => {
        describe('given  customer,email,description,amount', () => {
            request(app)
            .post('/api/v1/users/transfer')
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                "customer": "harkugbeostu@gmail.com",
                "email": "harkugbeosaz@gmail.com",
                "description": "sample description",
                "amount": 20000
            })
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((res) => {
                expect(res.body).have.property("status", "success");
                expect(res.body).have.property("message", "Transfer successful");
            }).end(done);
        })
    });

});