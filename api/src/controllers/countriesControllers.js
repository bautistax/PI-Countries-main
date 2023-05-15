const { Countries, Activities } = require('../db.js');
const { Op } = require('sequelize');

const getAllCountries = async () => {
    const allCountries = await Countries.findAll({
        attributes: ['id', 'name', 'image', 'continent', 'capital', 'subregion', 'area', 'population'],
        include: {
            model: Activities,
            attributes: ['name', 'difficulty', 'duration', 'season'],
            through: {attributes: [] },//Indicates that you do not want to include information from the intermediate table that relates the Countries and Activities tables.
        }
    });
    return allCountries;
};

const getCountriesById = async (id) => {
    const countryId = await Countries.findByPk(id.toUpperCase(),{
        include: {
            model: Activities,
            attributes: ['name', 'difficulty', 'duration', 'season']
        }
    });
    return countryId;
};

const getCountriesByName = async (name) => {
    const theName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    const countryByName = await Countries.findAll({
        where: {name: { [Op.substring]: `%${theName}%`} },
        include: {
            model: Activities,
            attributes: ['name', 'difficulty', 'duration', 'season'],
            through: { attributes: [] }
        },
    })
    return countryByName;
};

module.exports= {getCountriesById, getAllCountries, getCountriesByName};