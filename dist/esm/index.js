import tinderApi from "tinder-api-js";
import { colors } from "./utils/colors";
import { autoLike } from "./controllers/feelings";
async function startAutoLike(criterias) {
    const autoLikeStatus = await autoLike(criterias);
    if (autoLikeStatus.likesRemaining === 0) {
        const nextLikeDate = new Date(autoLikeStatus.rateLimitUntil).toLocaleString();
        console.log(colors.bgRed, `Sorry, next like allowed : ${nextLikeDate}`, colors.reset);
    }
    else {
        startAutoLike(criterias);
    }
}
export async function tinderAutoLike(config) {
    try {
        const login = await tinderApi.auth.withFacebook(config.facebookAuth);
        if (login) {
            startAutoLike(config.criterias);
        }
        return true;
    }
    catch (_a) {
        return false;
    }
}
