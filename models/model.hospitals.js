import Sequelize from 'sequelize';
import { generateIdentifier } from '../helpers/helper.random.js';
import { Configs } from '../configs/configs.js';

export const Hospital = Configs.define('__tbl_hospital', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    refhospital: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: generateIdentifier({prefix: "hosp-"})
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ""
    },
    latitudes: {
        type: Sequelize.STRING,
        allowNull: false
    },
    longitudes: {
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
