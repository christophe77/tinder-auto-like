"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tinderAutoLike = void 0;
const tinder_api_js_1 = __importDefault(require("tinder-api-js"));
const colors_1 = require("./utils/colors");
const feelings_1 = require("./controllers/feelings");
const tinderAutoLikeConfig = {
    facebookAuth: {
        token: "EAAGm0PX4ZCpsBAMXM4arasj7iEYg2DI5UCI7a28AE0WcIw3YdgmfyMlXrn8bVnEy5Iz1wPsFIjrco1PmKXKwdPPdTkedqbQqLdy3aVoifnSMVvX2z9qKLXQD8ZAPrgEsFOruh2XYJEGYMQzZB4QnMACpn5LZBiY1HiNQCk5qei1ww9roiJJZB",
        facebook_id: "1651500123",
    },
    criterias: {
        hasBio: true,
        hasJob: false,
        minPics: 3,
    },
};
async function startAutoLike(criterias) {
    const autoLikeStatus = await (0, feelings_1.autoLike)(criterias);
    if (autoLikeStatus.likesRemaining === 0) {
        const nextLikeDate = new Date(autoLikeStatus.rateLimitUntil).toLocaleString();
        console.log(colors_1.colors.bgRed, `Sorry, next like allowed : ${nextLikeDate}`, colors_1.colors.reset);
    }
    else {
        startAutoLike(criterias);
    }
}
async function tinderAutoLike(config) {
    try {
        const login = await tinder_api_js_1.default.auth.withFacebook(config.facebookAuth);
        if (login) {
            startAutoLike(config.criterias);
        }
        return true;
    }
    catch (_a) {
        return false;
    }
}
exports.tinderAutoLike = tinderAutoLike;
tinderAutoLike(tinderAutoLikeConfig);
