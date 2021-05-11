import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:4000/api/guess" });

const startGame = async () => {
    try {
        const {
            data: { msg },
        } = await instance.post("/start");
        return msg;
    } catch {
        return "The server has done please restart the server";
    }
};

const guess = async (number) => {
    if (number < 0 || number > 100) return `Error: "${number}" is not a valid number (1 - 100)`;
    else {
        try {
            const {
                data: { msg },
            } = await instance.get("/guess", { params: { number } });

            return msg;
        } catch {
            return "The server has been down please restart the server";
        }
    }
};

const restart = async () => {
    try {
        const {
            data: { msg },
        } = await instance.post("/restart");
        return msg;
    } catch {
        return "The server has done please restart the server";
    }
};

export { startGame, guess, restart };
