module.exports = (sequelize, DataTypes) => {
  // model(테이블) 이름인 User가 자동으로 소문자복수형이 되어 mysql에 저장된다.
  const User = sequelize.define(
    "User",
    // 첫 번째 인자: 스키마
    {
      identity: {
        type: DataTypes.STRING(30),
        allowNull: false, // 필수
        unique: true, // 고유한 값
      },
      name: {
        type: DataTypes.STRING(30),
        allowNull: false, // 필수
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false, // 필수
      },
      isMaker: {
        type: DataTypes.INTEGER,
        allowNull: false, // 필수
      },
    },
    // 두 번째 인자: 세팅값
    {
      charset: "utf8",
      collate: "utf8_general_ci", // 한글 저장
    }
  );
  return User;
};
