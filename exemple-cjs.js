const { tinderAutoLike } = require("./dist/cjs");

const tinderAutoLikeConfig = {
  facebookAuth : {
    email: "t0fxxx@gmail.com",
    password: "69tachatte696969",
  },
  criterias: {
    hasBio: true,
    hasJob: false,
    minPics: 3,
  },
};
tinderAutoLike(tinderAutoLikeConfig);
