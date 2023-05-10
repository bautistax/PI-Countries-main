const {createActivities, getAllActivities} = require('../controllers/activitiesControllers.js');

const postActivitiesHandler = async (req,res) => {
    const {name,difficulty,duration,season, CountryId} = req.body;
    try {
        const response = await createActivities( name,difficulty,duration,season, CountryId);
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

const getAllActivitiesHandler = async (req,res) => {
    try {
        const response = await getAllActivities();
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

module.exports= {postActivitiesHandler, getAllActivitiesHandler};