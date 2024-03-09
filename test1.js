const loginUser = async (request, response) => {
    const { email, password } = request.body;
    if (!email || !password) {
        response.status(400);
        throw new Error('All fields are mandatory');
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            response.status(401);
            throw new Error('Email or password not correct');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            const accessToken = jwt.sign({
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                }
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
            response.status(200).json({ accessToken });
        } else {
            response.status(401);
            throw new Error('Email or password not correct');
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Server Error' });
    }
}
