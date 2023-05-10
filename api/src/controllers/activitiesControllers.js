const {Activities, Countries} = require('../db.js');

const createActivities = async (name, difficulty, duration, season, CountryId) => {

    try {
        const alreadyActivities = await Activities.findOne({
            where: {
                name: name,
            },
        });

        if (!alreadyActivities) {
            const activity = await Activities.create({ name, difficulty, duration, season })
            await activity.addCountry(CountryId)

            let activityWithCountry = await Activities.findOne({
                where: {
                    name: name
                },
                attributes: {
                    exclude: ['updatedAt', 'createdAt'],
                },
                include: {
                    model: Countries,
                    through: {
                        attributes: []
                    }
                }
            })
            return activityWithCountry
        }
        const activityWithCountry = await alreadyActivities.addCountry(CountryId)

        return activityWithCountry

    } catch (error) {
        throw new Error("Something went wrong while creating a new Activity")
    }
};

const getAllActivities = async () => {
    try {
        const allActivities = await Activities.findAll({ include: Countries })
        return allActivities

    } catch (error) {
        throw new Error({ error: error.message })
    }
};


module.exports = {createActivities, getAllActivities};