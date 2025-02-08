import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                token,
                message: "User not authenticated",
                success: false,
            })
        }
        const decode = await jwt.verify(token, "your_secret_key_here");
        console.log(decode,token,process.env.SECRET_KEY)
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        };
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log(error);
    }
}
export default isAuthenticated;