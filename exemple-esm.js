import { tinderAutoLike } from "./dist/esm";

const tinderAutoLikeConfig = {
  facebookAuth: {
    email: "email@gmail.com",
    password: "password",
  },
  criterias: {
    hasBio: true,
    hasJob: false,
    minPics: 3,
  },
};
tinderAutoLike(tinderAutoLikeConfig);
