import express from "express";
import getNumber from "../core/getNumber";

const fs = require("fs");
const router = express.Router();

function roughScale(x, base) {
    const parsed = parseInt(x, base);
    if (isNaN(parsed)) {
        return 0;
    }
    return parsed;
}

function getTime() {
    let time = new Date()
        .toLocaleString("sv-SE", { timeZone: "Asia/Taipei", hour12: false })
        .replace(" ", "-")
        .replaceAll(":", "-");
    return time;
}

function appendLog(logFileName, msg) {
    fs.appendFileSync(logFileName, msg + "\n");
}

let dirName = __dirname + "/../log";
let logFileName = dirName + `/../log/${getTime()}.log`;
if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName);
}
fs.createWriteStream(logFileName);

router.post("/start", (_, res) => {
    let number = getNumber(true);
    appendLog(logFileName, `start number=${number} ${getTime()}`);
    res.json({ msg: "The game has started." });
});

router.get("/guess", (req, res) => {
    const number = getNumber();
    const guessed = roughScale(req.query.number, 10);
    appendLog(logFileName, `guess ${guessed} ${getTime()}`);

    if (!guessed || guessed < 1 || guessed > 100) {
        res.status(400).send({ msg: "Not a legal number." });
    } else {
        if (number === guessed) {
            appendLog(logFileName, `end-game`);
            res.status(200).send({ msg: "Equal" });
        } else if (number > guessed) {
            res.status(200).send({ msg: "Bigger" });
        } else {
            res.status(200).send({ msg: "Smaller" });
        }
    }
});

router.post("/restart", (req, res) => {
    let number = getNumber(true);
    appendLog(logFileName, `restart number=${number} ${getTime()}`);
    res.json({ msg: "The game has restarted." });
});

export default router;
