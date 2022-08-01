require('../models/database')
const Category = require('../models/Category')
const Recipe = require('../models/Recipe')


/**
 * Get/
 * homepage
 */
exports.homepage = async(req, res) =>{
    try {
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber)
        const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNumber)
        const noodles = await Recipe.find({'category':'Noodles'}).limit(limitNumber)
        const burger = await Recipe.find({'category':'Burger'}).limit(limitNumber)
        const pizza = await Recipe.find({'category':'Pizza'}).limit(limitNumber)
        const african = await Recipe.find({'category':'African'}).limit(limitNumber)
        const veggie = await Recipe.find({'category':'Veggie'}).limit(limitNumber)
        const food = {latest, noodles, burger, pizza, african, veggie };
        res.render('index', {title: 'Food Blog | Home', categories, food});
    } catch (error) {
        res.status(500).send({message: error.message || "Error occured"});
    }
}
/**
 * Get/
 * categories
 */
exports.exploreCategories = async(req, res) =>{
    try {
        const limitNumber = 20;
        const categories = await Category.find({}).limit(limitNumber)
        res.render('categories', {title: 'Food Blog | Categories', categories});
    } catch (error) {
        res.status(500).send({message: error.message || "Error occured"});
    }
}
/**
 * Get/
 * exploreCategoryById
 */
 exports.exploreCategoryById = async(req, res) =>{
    try {
        let categoryId = req.params.id;
        const limitNumber = 20;
        const categoryById = await Recipe.find({'category': categoryId}).limit(limitNumber)
        res.render('categories', {title: 'Food Blog | Categories', categoryById});
    } catch (error) {
        res.status(500).send({message: error.message || "Error occured"});
    }
}
/**
 * Get/
 * recipes
 */
 exports.exploreRecipe = async(req, res) =>{
    try {
        let recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId)        
        res.render('recipe', {title: 'Food Blog | Recipes', recipe});
    } catch (error) {
        res.status(500).send({message: error.message || "Error occured"});
    }
}
/**
 * search/
 * recipes
 */
 exports.searchRecipe = async(req, res) =>{
    try { 
        let searchTerm = req.body.searchTerm;
        let recipe = await Recipe.find({$text: {$search: searchTerm, $diacriticSensitive: true}})       
        res.render('search', {title: 'Food Blog | search', recipe});
    } catch (error) {
        res.status(500).send({message: error.message || "Error occured"});
    }
}
/**
 * explore/
 * latest
 */
 exports.exploreLatest = async(req, res) =>{
    try { 
        const limitNumber = 20;
        const recipe = await Recipe.find({}).sort({_id: -1}).limit(limitNumber)       
        res.render('explore-latest', {title: 'Food Blog | Explore Latest', recipe});
    } catch (error) {
        res.status(500).send({message: error.message || "Error occured"});
    }
}
/**
 * explore/
 * random
 */
 exports.exploreRandom = async(req, res) =>{
    try { 
        let count = await Recipe.find().countDocuments();
        let random = Math.floor(Math.random() * count)
        let recipe = await Recipe.findOne().skip(random).exec()     
        res.render('explore-random', {title: 'Food Blog | Explore random', recipe});
    } catch (error) {
        res.status(500).send({message: error.message || "Error occured"});
    }
}

/**
 *  get submit/
 * recipe form
 */
 exports.submitRecipe = async(req, res) =>{  
    const infoErrorsObj = req.flash('infoErrors')
    const infoSubmitObj = req.flash('infoSubmit')   
    res.render('submit-recipe', {title: 'Food Blog | Submit Recipe', infoErrorsObj, infoSubmitObj});
}
/**
 * post recipe/
 * 
 */
 exports.createRecipe = async(req, res) =>{

    try {
        let imageUploadFile;
        let uploadPath;
        let newImageName;
        if (!req.files || object.keys(req.files).length === 0) {
            console.log('No files uploaded');
        }else{
            imageUploadFile = req.files.image;
            newImageName = Date.now() + imageUploadFile.name;
            
            uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;
            imageUploadFile.mv(uploadPath, function(err){
                if (err) return res.status(500).send(err);
            })

        }

        const newRecipe = new Recipe({
            name: req.body.name,
            description: req.body.description,
            email: req.body.email,
            ingredients: req.body.ingredients,
            category: req.body.category,
            image: newImageName
        });

        await newRecipe.save();

        req.flash('infoSubmit', "Your Recipe has been added")
        res.redirect('/submit-recipe')
    } catch (error) {    
        // res.json(error)
        req.flash('infoErrors', error)
        res.redirect('/submit-recipe')
    }

}

