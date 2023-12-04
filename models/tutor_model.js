import { Sequelize } from 'sequelize'
import db from '../config/database.js';
import Pet from '../models/pet_model.js';


const {DataTypes} = Sequelize;

const Tutor = db.define('tutor', {
    codigo_tutor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome_tutor: {
        type: DataTypes.STRING(50),
    },   
    cpf_tutor: {
        type: Sequelize.STRING(14),
    },
    email_tutor: {
        type: Sequelize.STRING(100),
    },
},{
    timestamps: false,
    freezeTableName: true,
});

Tutor.associate = (models) => {
    Tutor.hasMany(Pet,
        { foreignKey: 'id_tutor', as: 'pets' });  //Associação entre Tutor e Pet
};

Pet.belongsTo(Tutor, {foreignKey:'id_tutor', allowNull: 'true'});

export default Tutor;
