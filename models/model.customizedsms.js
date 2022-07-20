import Sequelize from 'sequelize';
import { generateIdentifier } from '../helpers/helper.random.js';
import { Configs } from '../configs/configs.js';

export const Customersms = Configs.define('__tbl_customizedsms', {
    from: {
        type: Sequelize.STRING,
        allowNull: false
    },
    from_token: {
        type: Sequelize.STRING,
        allowNull: false
    },
    to_token: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fill: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: generateIdentifier({prefix: "hosp-"})
    },
    to: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    createdon: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
}, {
    timestamps: false,
    freezeTableName: true
});
