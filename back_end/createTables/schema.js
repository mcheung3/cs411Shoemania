var Schema = {
  users: {
    id: {type: 'increments', nullable: false, primary: true},
    name: {type: 'string', maxlength: 150, nullable: false, unique: true},
    password: {type: 'string', maxlength: 150, nullable: false},
    location: {type: 'string', maxlength: 150, nullable: true}
  },
  
  shoes: {
    id: {type: 'increments', nullable: false, primary: true},
    brand: {type: 'string', maxlength: 150, nullable: true},
    photo: {type: 'string', maxlength: 1500, nullable: true},
    description: {type: 'string', maxlength: 1500, nullable: true},
    color: {type: 'string', maxlength: 150, nullable: true},
    name: {type: 'string', maxlength: 150, nullable: true},
    type: {type: 'string', maxlength: 150, nullable: true},
    price: {type: 'float', nullable: true}
  }

};
module.exports = Schema;