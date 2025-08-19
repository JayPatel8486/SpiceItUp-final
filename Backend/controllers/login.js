const register = require('../models/regSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email or password are required" });
        }

        const user = await register.findOne({ email: email });
        let datas;
        datas = user.email;
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            if (user.loginCount === 5) {
                return res.status(400).json({ message: "Your account has been temporarily locked due to 5 consecutive incorrect login attempts. please reset your password to regain access." })
            }
            await register.updateOne(
                { email: datas },
                {
                    $set: {
                        loginCount: user.loginCount + 1,
                    },
                }
            );
            return res.status(400).json({ message: "Invalid password", remainAttempt: 5 - user.loginCount })
        }
        let data;
        const token = jwt.sign({ email: email }, process.env.SECRET_KEY, { expiresIn: "4h" });
        data = { user };
        data.token = token;
        await register.updateOne(
            { email: datas },
            {
                $set: {
                    loginCount: 0,
                },
            }
        );
        res.status(200).json({
            message: "Login successful",
            data
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    login
}

