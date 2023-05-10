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

const getCountriesHandlerById = async (req,res) => {
    const {id} = req.params;
    try {
        const response = await getCountriesById(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

module.exports = {getCountriesHandlerById, getCountriesHandler};