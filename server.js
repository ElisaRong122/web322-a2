/********************************************************************************
* WEB322 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: Rong Chen  Student ID: 132356221 Date:02/16/2024
*
* Published URL:http://localhost:8080/ 
                http://localhost:8080/lego/sets
                http://localhost:8080/lego/sets/num-demo
                http://localhost:8080/lego/sets/theme-demo
********************************************************************************/
const express = require('express');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
const legoData = require("./modules/legoSets");

legoData.initialize()
    .then(() => {
        app.get("/", (req, res) => {
            res.send("Assignment 2: Rong Chen - 132356221");
        });

        app.get("/lego/sets", (req, res) => {
            legoData.getAllSets()
                .then(sets => res.json(sets))
                .catch(err => res.status(404).send("LEGO sets not found"));
        });

        app.get("/lego/sets/num-demo", (req, res) => {
            const setNum = "0011-2";
            legoData.getSetByNum(setNum)
                .then(set => res.json(set))
                .catch(err => res.status(404).send("LEGO set not found"));
        });

        app.get("/lego/sets/theme-demo", (req, res) => {
            const theme = "Technic";
            legoData.getSetsByTheme("tech")
                .then(sets => res.json(sets))
                .catch(err => res.status(404).send("LEGO sets for the theme not found"));
        });

        app.listen(HTTP_PORT, () => console.log(`Server listening on: ${HTTP_PORT}`));
    })
    .catch(error => console.error("Error initializing LEGO data:", error));
