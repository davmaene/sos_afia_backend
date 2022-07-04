import Sequelize from 'sequelize';
import { generateIdentifier } from '../helpers/helper.random.js';
const { Configs } = require('../configs/Configs.js');

const Users = Configs.define('__tbl_users', {
    fsname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lsname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nickname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    hospitalref: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: generateIdentifier({ prefix: "REF-HOSP" })
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

module.exports = {
    Users
}
