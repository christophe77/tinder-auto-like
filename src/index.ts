import tinderApi from "tinder-api-js";
import { TinderAutoLikeConfig } from "./types/tinderAutoLike";
import { colors } from "./utils/colors";
import { autoLike } from "./controllers/feelings";
import { Criterias } from "./types/feelings";

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

async function startAutoLike(criterias: Criterias) {
  const autoLikeStatus = await autoLike(criterias);
  if (autoLikeStatus.likesRemaining === 0) {
    const nextLikeDate = new Date(autoLikeStatus.rateLimitUntil).toLocaleString();
    console.log(
      colors.bgRed,
      `Sorry, next like allowed : ${nextLikeDate}`,
      colors.reset
    );
  } else {
    startAutoLike(criterias);
  }
}

export async function tinderAutoLike(config: TinderAutoLikeConfig) {
  try {
    const login = await tinderApi.auth.withFacebook(config.facebookAuth);
    if (login) {
      startAutoLike(config.criterias);
    }
    return true;
  } catch {
    return false;
  }
}

tinderAutoLike(tinderAutoLikeConfig);
