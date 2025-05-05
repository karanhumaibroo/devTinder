const auth = (req, res, next) => {
    const data = "xyz";
    const authorization = "xyz" === data; // This will always be true in this example
    if (!authorization) {
        res.status(401).send("authentication fail"); // Use status for error response
    } else {
        next();
    }
}
const userauth = (req, res, next) => {
    const data = "xyz";
    const authorization = "xyz" === data; // This will always be true in this example
    if (!authorization) {
        res.status(401).send("authentication fail"); // Use status for error response
    } else {
        next();
    }
}
module.exports = { auth, userauth };