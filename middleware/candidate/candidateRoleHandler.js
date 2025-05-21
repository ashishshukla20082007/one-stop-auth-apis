const asyncHandler = require("express-async-handler"); 
const {UserRole} = require("../../constants");

const candidateRoleHandler = asyncHandler(async (req, res, next) => {
    if(req.user.role !== UserRole.CANDIDATE) {            
        res.status(403);
        throw new Error("Not authorized, you are not an candidate");
    }  
    next();
});
module.exports = {candidateRoleHandler};
