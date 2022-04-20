const { tinderAutoLike } = require("./dist/cjs");

const tinderAutoLikeConfig = {
  facebookAuth: {
    token:
      "EAAGm0PX4ZCpsBAMXM4arasj7iEYg2DI5UCI7a28AE0WcIw3YdgmfyMlXrn8bVnEy5Iz1wPsFIjrco1PmKXKwdPPdTkedqbQqLdy3aVoifnSMVvX2z9qKLXQD8ZAPrgEsFOruh2XYJEGYMQzZB4QnMACpn5LZBiY1HiNQCk5qei1ww9roiJJZB",
    facebook_id: "1651500123",
  },
  criterias: {
    hasBio: true,
    hasJob: false,
    minPics: 3,
  },
};
tinderAutoLike(tinderAutoLikeConfig);
