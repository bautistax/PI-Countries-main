const { json } = require('sequelize');
const {getCountriesById, getAllCountries, getCountriesByName} = require('../controllers/countriesControllers.js');

const getCountriesHandler = async (req,res) => {
    const { name } = req.query;
    if(!name){
        try {
            const allCountries = await getAllCountries();
            res.status(200).json(allCountries);
        } catch (error) {
            res.status(404).json({error: error.message});
        }
    }else{
        try {
            const countryName = await getCountriesByName(name);
            res.status(200).json(countryName);
        } catch (error) {
            res.status(404).json({error: "Country not Found"});
        }
    }
}

const getCountriesHandlerById =  (req,res) => {
    const {id} = req.params;
    getCountriesById(id)
    .then(response=> res.status(200).json (response))
     .catch(error=>res.status(400).json(error)) ;
    
};

module.exports = {getCountriesHandlerById, getCountriesHandler};