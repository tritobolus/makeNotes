import jwt from 'jsonwebtoken'

const verifyUser = (req, res, next) => {
    const token = req.cookies.token 
    if(!token){
        console.log("not authenticated!")
        return res.status(401).json({Error: "You are not authenticated!"})
    } else {
        try {
            const decode = jwt.verify(token, process.env.SECRET_KEY)
            // console.log(decode)
            req.userId = decode.userId  // req.name is how Express lets you “carry” user information through the request chain.It’s not just about storing data — it’s about making it available later in the same request.
            req.username = decode.username;
            req.email = decode.email;
            next()
        } catch (error) {
            return res.status(401).json({ Error: "Token is invalid!" });
        }
    }
}

export default verifyUser;