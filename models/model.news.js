import Sequelize from 'sequelize';
import { generateIdentifier } from '../helpers/helper.random.js';
import { Configs } from '../configs/configs.js';

export const News = Configs.define('__tbl_news', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    refhospital: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    createdon: {
        type: Sequelize.STRING,
        allowNull: false
    },
    img: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: 1
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
