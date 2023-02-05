'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SlideImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  SlideImage.init({
    /* id: DataTypes.INTEGER, */
    imageUrl: DataTypes.STRING,
    text: DataTypes.STRING,
    order: DataTypes.INTEGER,
    organizationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SlideImage',
  });
  return SlideImage;
};