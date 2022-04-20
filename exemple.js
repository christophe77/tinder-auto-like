const {config, tinderAutoLike} = require("./dist/cjs");

const facebookAuth = {
    token:
      "EAAGm0PX4ZCpsBADOYsqssNBjtHFqFSADsOpjbZAfNgl7JkIjFwPlgvL2nj3oUqcCtWce1cLSAJHgG4d6m5hEeMlvbdOPFItD1YBik7cZByptBC6ZC5ovCI2IpsI3ZCBXZC5YztZCRcaqRZB1qcj8xWdceDjzHQI66Lkfcn20OP4qNdDlNjVeUP7e",
    facebook_id: "10203657144023091",
};
const autoLikeConfig = {...config};
autoLikeConfig.facebookAuth = facebookAuth;
autoLikeConfig.criterias = {
    hasBio: true,
    hasJob: false,
    minPics: 3,
}
tinderAutoLike(autoLikeConfig);
