import User from "../db/models/User.js";


/**
 * queries db for an user with username and sessionId from cookie
 * if unsuccessfull returns status 401 message breaking the middleware chain
 * if successfull passes { username, sessionId, userId,  } to succeeding middlewares 
 * 
 * EXAMPLE AUTHORIZED ROUTE
 * app.use("/api", authorize, v1: express.Router);
 * 
 * EXAMPLE USAGE INSIDE SUCCEEDING MIDDLEWARE: 
 * const { username, sessionId, userId } = res.locals;
 * OR
 * const { user } = res.locals;
 */
const authorize = async (req, res, next) => {
    const { username, sessionId } = req.cookies;

    if (!username || !sessionId) {
        return res.status(401).json({
            message: "Not Authorized"
        });
    }

    // to optimize this in the future only a subset of the data should be selected
    // once the size of the document will get too big to store all of it
    const user = await User.collection.findOne({ 
        "account.username" : username,
        "account.sessionId": sessionId 
    });
    
    if (user === null) {
        return res.status(401).json({
            message: "Not Authorized"
        });
    }
    // authorized
    
    // pass session data and userId to succeeding middlewares
    res.locals.username = username;
    res.locals.sessionId = sessionId;
    res.locals.userId = user._id.toString();
    res.locals.user = user;
    return next();
}

export default authorize;
