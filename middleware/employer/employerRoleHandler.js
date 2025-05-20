const asyncHandler = require("express-async-handler");
const {UserRole} = require("../../constants");

const employerRoleHandler = asyncHandler(async (req, res, next) => {
    if(req.user.role !== UserRole.EMPLOYER) {
        // Check if the user is an employer 
        res.status(403);
        throw new Error("Not authorized, you are not an employer");
    }      
    next();
});
module.exports = {employerRoleHandler};
