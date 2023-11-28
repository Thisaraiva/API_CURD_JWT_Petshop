import { Sequelize } from 'sequelize'
import db from '../config/database.js';

const {DataTypes} = Sequelize;

const Pet = db.define('pet', {
    codigo_pet: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome_pet: {
        type: DataTypes.STRING(100),
    },   
    genero_pet: {
        type: DataTypes.STRING(1),
    },
    altura_pet: {
        type: DataTypes.INTEGER,
    },
    id_tutor: {        
        type: DataTypes.INTEGER,
        references:{
            model:'tutor',
            key:'codigo_tutor'
        }
    },
    altura_categoria: {
        type: Sequelize.STRING(50),
    },    
},{
    timestamps: false,
    freezeTableName: true,
});

export default Pet;