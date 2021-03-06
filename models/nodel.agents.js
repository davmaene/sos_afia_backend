import Sequelize from 'sequelize';
import { generateIdentifier } from '../helpers/helper.random.js';
import { Configs } from '../configs/configs.js';

export const Agents = Configs.define('__tbl_agents', {
    fsname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lsname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pushtoken: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ""
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    hospitalref: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ""
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
