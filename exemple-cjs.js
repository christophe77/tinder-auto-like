const { tinderAutoLike } = require("./dist/cjs");

const tinderAutoLikeConfig = {
  facebookAuth: {
    email: "aaaaaaa@gmail.com",
    password: "aaaaaaaa",
  },
  criterias: {
    hasBio: true,
    hasJob: false,
    minPics: 3,
    maxDistance: 15
  },
};
tinderAutoLike(tinderAutoLikeConfig);
