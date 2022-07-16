import Sequelize from 'sequelize';
import { generateIdentifier } from '../helpers/helper.random.js';
import { Configs } from '../configs/Configs.js';

export const SOS = Configs.define('__tbl_sos', {
    hospitalref: {
        type: Sequelize.STRING,
        allowNull: false
    },
    refsos: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: true
    },
    latitude: {
        type: Sequelize.STRING,
        allowNull: false
    },
    longitude: {
        type: Sequelize.STRING,
        allowNull: false
    },
    altitude: {
        type: Sequelize.STRING,
        allowNull: false
    },
    speed: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
}, {
    timestamps: false,
    freezeTableName: true
});
