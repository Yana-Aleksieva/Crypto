const router = require('express').Router();
const publicationService = require('../services/publicationService');
const {storePublication, isOwner} = require('../iddlewares/publicationMiddleware');


router.get('/catalog', async (req, res) => {
    const publication = await publicationService.getAll()
    

    res.render('catalog', {publication});
});

router.get('/create', async (req, res) => {

    res.render('create');
});


router.post('/create', async (req, res) => {
    const publication = await publicationService.create({...req.body, owner: req.user._id});


    res.redirect('catalog' );
});

router.get('/details/:id', async (req, res) => {
    
    const publicationUnlean = await publicationService.getOne(req.params.id);
   const isOwner = publicationUnlean.owner._id == req.user?._id;
   const isBuyer = publicationUnlean.buyers.includes(req.user._id);
   const publication = await publicationService.getOneDetailed(req.params.id)
    res.render('details', {...publication,isOwner, isBuyer})
});

router.get('/:id/edit', async (req, res) => {
    const publication = await publicationService.getOneDetailed(req.params.id);

    res.render('edit', {...publication})
});

router.post('/:id/edit', async (req, res) => {

    await publicationService.updateOne(req.params.id, req.body);
    res.redirect('/catalog')
});

router.get('/:id/delete', async (req, res) => {
    
    await publicationService.deleteOne(req.params.id);
    const publication = await publicationService.getAll();
    res.render('catalog', {publication})

});

router.get('/:id/buy', async (req, res) => {
    
   const currentPublication = await publicationService.getOne(req.params.id);
   currentPublication.buyers.push(req.user._id);
   await currentPublication.save();
  const publication = await publicationService.getAll();
    res.render('catalog', {publication})

});

router.get('/search', async (req, res) => {
    const publication = await publicationService.getAll();
    res.render('search', {publication})
});

router.post('/search', async (req, res) => {
    
    const {name, payment} = req.body;
    const publication = await publicationService.findAllByName(name);
    console.log(publication)
    const isEqual = (publication.paymentMethod === payment) 
 
    res.render('search', {publication, isEqual})
})


module.exports = router;