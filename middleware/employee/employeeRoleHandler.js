const asyncHandler = require("express-async-handler"); 
const {UserRole} = require("../../constants");

const employeeRoleHandler = asyncHandler(async (req, res, next) => {
    if(req.user.role !== UserRole.EMPLOYEE) {            
        res.status(403);
        throw new Error("Not authorized, you are not an employee");
    }  
    next();
});
module.exports = {employeeRoleHandler};
