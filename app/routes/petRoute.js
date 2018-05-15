const db = require('../models');
const bodyParser = require("body-parser");
var authCheckService = require('../services/authCheckService.js');

module.exports = function (app) {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    
    app.use(bodyParser.json());    

    app.get('/api/pet', authCheckService.isAuthenticated, (req, res) => {
        db.Pet.findAll({}).then(function (pets) {
            res.send(pets);
        }); 
    });
    
    app.post('/api/pet', authCheckService.isAuthenticated, (req, res) => {
        console.log("request"+JSON.stringify(req.body));
        
        var newPet = {
            name: req.body.name,
            imageUrl: req.body.imageUrl,
            about: req.body.about,
            type: req.body.type, 
            breed: req.body.breed,
            UserId: req.body.UserId
        };

        db.Pet.create(newPet).then((petResponse) => {
            res.status(201).send(petResponse);
        }).catch((err) => {
            res.status(500).send('Ooopsie whoopsie ' + err);
        });
    });
};