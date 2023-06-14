function isAuthenticated(req: any, res: any, next: any) {
    const jwt = require('jsonwebtoken');
    const { authorization } = req.headers;

    if (!authorization) {
        res.status(401);
        throw new Error('🚫 Un-Authorized 🚫');
    }

    try {
        const token = authorization.split(' ')[1];
        console.log(process.env.JWT_ACCESS_SECRET)
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.payload = payload;
    } catch (err: any) {
        res.status(401);
        if (err.name === 'TokenExpiredError') {
            throw new Error(err.name);
        }
        throw new Error('🚫 ssUn-Authorized 🚫' + err.message);
    }

    return next();
}

module.exports = {
    isAuthenticated
}