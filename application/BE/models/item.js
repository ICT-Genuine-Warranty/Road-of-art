module.exports = (sequelize, DataTypes) => {
  // model(테이블) 이름인 Post가 자동으로 소문자복수형이 되어 mysql에 저장된다.
  const Item = sequelize.define(
    "Item",
    // 첫 번째 인자: 스키마
    {
      itemId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      maked: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      tradeNum: {
        type: DataTypes.INTEGER,
        allowNull: false, // 필수
      },
      firstSeller: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      owner: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      imageSrc: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
    },
    // 두 번째 인자: 세팅값
    {
      charset: "utf8mb4", // 이모티콘까지 포함하려면 utf8mb4로 저장
      collate: "utf8mb4_general_ci", // 한글 저장
    }
  );
  return Item;
};
