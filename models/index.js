const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/tripplanner', { logging: false }); 


const Place = db.define('place', {
    address: {
        type: Sequelize.STRING
        
    }, 
    city: {
        type: Sequelize.STRING
    }, 
    state: {
        type: Sequelize.STRING(2)
    },
    phone: {
        type: Sequelize.STRING
    },
    location: {
        type: Sequelize.ARRAY(Sequelize.FLOAT)
    }
});

const Hotel = db.define('hotel', {
    name: {
        type: Sequelize.STRING
    }, 
    num_stars: {
        type: Sequelize.FLOAT,
        validate: {
            min: 1,
            max: 5
        }
    }, 
    amenities: {
        type: Sequelize.STRING
    }

});





module.exports = {
    db: db
}