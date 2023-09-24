import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try{
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    // here we are taking the token from the right of "Bearer " so that means 7 characters so that is done below
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    // so basically you can put this after the middleware or before the middleware as long as its before the final "register" logic
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.usuer = verified;
    next();

  } catch (err) {
    res.status(500).json({error: err.message})
  }
}