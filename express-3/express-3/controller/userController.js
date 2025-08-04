const createUser = async (req, res) => {
    res.send('Hello World');
};
const loginUser = async (req, res) => {
    res.send('Login successful');
};

module.exports = {
    createUser,loginUser
}