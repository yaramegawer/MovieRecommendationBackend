const express=require('express');
const router=express.Router();
const { getRecommendation } = require('../controllers/movieController');

router.get('/movie_recommendation',getRecommendation);

module.exports=router;