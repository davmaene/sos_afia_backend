import Sequelize from 'sequelize';
const { Configs } = require('../configs/Configs.js');

const Users = Configs.define('__tbl_admins', {
    fsname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lsname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telephone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    avatar: {
        type: Sequelize.STRING,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    accesslevel: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'r'
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
