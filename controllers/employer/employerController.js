const asyncHandler = require('express-async-handler');
const employerProfile = require('../../models/employer/employerModel');

const getEmployers = asyncHandler (async (req, res) => {
    const allEmployers = await employerProfile.find({user_id: req.user.id});
    if(allEmployers){  
    res.status(200).json(allEmployers);
    }else{
        res.status(404);
        throw new Error("No Employers found");
    }
 });

const createEmployer = asyncHandler (async (req, res) => {
    console.log('The request body',req.body);
    const {companyName, email, phone, contactPerson, industry, companyDescription, website, postedJobs} = req.body;
    if(!companyName || !email || !phone) {
         res.status(400);
         throw new Error("Please provide companyName, email and phone");         
    }     
    await employerProfile.create({ 
        user_id: req.user.id,       
        companyName,
        email,
        phone,
        contactPerson,
        industry,
        companyDescription,
        website,
        postedJobs,
    }).then((employerDetails) => {
        res.status(201).json(employerDetails);
    }).catch((error) => {
        res.status(400);
        throw new Error("Employer not created");
    });   
});

const getEmployer = asyncHandler( async (req, res) => {
    const employerID = req.params.id;    
    const employerDetailObj = await employerProfile.findById(employerID);
    if(!employerDetailObj){
        res.status(404);
        throw new Error("Employer not found");
    }  

    if(employerDetailObj.user_id.toString() !== req.user.id){
        res.status(401);
        throw new Error("User not authorized to update this contact");
    }  
    res.status(200).json(employerDetailObj);
});

const updateEmployer = asyncHandler( async (req, res) => {
    const employerID = req.params.id;    
    const employerDetailObj = await employerProfile.findById(employerID);
    if(!employerDetailObj){
        res.status(404);
        throw new Error("Employer not found");
    } 
    
    if(employerDetailObj.user_id.toString() !== req.user.id){
        res.status(401);
        throw new Error("User not authorized to update this contact");
    }
    try{
        const employerDetails = await employerProfile.findByIdAndUpdate(employerID, req.body, {new: true});
        res.status(200).json(employerDetails);
    }catch(error){
        res.status(400);
        throw new Error("Employer not updated");
    } 
});

const deleteEmployer = asyncHandler( async (req, res) => {
    const employerID = req.params.id;    
    const employerDetailObj = await employerProfile.findById(employerID);
    if(!employerDetailObj){
        res.status(404);
        throw new Error("Employer not found");
    } 
    if(employerDetailObj.user_id.toString() !== req.user.id){
        res.status(401);
        throw new Error("User not authorized to delete this Employer");
    }
    try{
        const employerDetails = await employerProfile.deleteOne(employerDetailObj);
        res.status(200).json({ message: `Employer with id ${employerID} deleted successfully`});
    }catch(error){
        res.status(400);
        throw new Error("Employer not deleted");
    } 
});

module.exports = {getEmployers, getEmployer, updateEmployer, createEmployer, deleteEmployer};