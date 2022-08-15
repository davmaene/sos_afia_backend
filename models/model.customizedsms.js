import Sequelize from 'sequelize';
import { generateIdentifier } from '../helpers/helper.random.js';
import { Configs } from '../configs/configs.js';
import dotenv from 'dotenv';

dotenv.config();

export const Customersms = Configs.define('__tbl_customizedsms', {
    from: {
        type: Sequelize.STRING,
        allowNull: false
    },
    from_token: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: process.env.APPESCAPESTRING
    },
    to_token: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fill: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pos: {
        type: Sequelize.INTEGER,
        allowNull: false
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
        defaultValue: new Date().toLocaleString()
    }
}, {
    timestamps: false,
    freezeTableName: true
});
