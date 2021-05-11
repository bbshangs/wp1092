let number;

const getNumber = (forceRestart = false) => {
    if (number === undefined || forceRestart === true) number = Math.floor(Math.random() * 100);
    return number;
};

export default getNumber;
