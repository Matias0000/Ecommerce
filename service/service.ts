import * as bcrypt from "bcrypt"

const authServiceFactory = () => {

    const validate = async (password, dbPassword) => {
        return await bcrypt.compare(password, dbPassword);
    };

    return {validate};
};

module.exports = {
    authServiceFactory
};