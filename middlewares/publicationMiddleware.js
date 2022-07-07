const publicationService = require('../services/publicationService');


exports.storePublication = async (req, res, next) => {
  
    const publication = await publicationService.getOneDetailed(req.params.id);
    req.publication = publication;
    next();
    
}
exports.isOwner = (req, res, next) => {
   
    if(!req.publication.owner == req.user._id){
        return next({ message: 'You are not authorized', status: 401 });
    }
    next();
}