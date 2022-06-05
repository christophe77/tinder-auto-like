"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoLike = void 0;
const tinder_api_js_1 = __importDefault(require("tinder-api-js"));
const colors_1 = require("../utils/colors");
let likesRemaining = -1;
let availableProfileAmount = -1;
let rateLimitUntil = -1;
function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
async function sendLike(id) {
    var _a;
    try {
        const myLike = await tinder_api_js_1.default.feeling.like(id);
        availableProfileAmount = availableProfileAmount - 1;
        return myLike;
    }
    catch (error) {
        throw new Error(((_a = error.response) === null || _a === void 0 ? void 0 : _a.statusText) || "sendLike failed");
    }
}
async function sendPass(id) {
    var _a;
    try {
        const myPass = await tinder_api_js_1.default.feeling.pass(id);
        availableProfileAmount = availableProfileAmount - 1;
        return myPass;
    }
    catch (error) {
        throw new Error(((_a = error.response) === null || _a === void 0 ? void 0 : _a.statusText) || "sendPass failed");
    }
}
function handleSendLikeResponse(sendLikeResponse, profile) {
    likesRemaining = sendLikeResponse.likes_remaining;
    rateLimitUntil = sendLikeResponse.rate_limited_until;
    if (sendLikeResponse.match) {
        console.log(colors_1.colors.bgCyan, "you have a match!", colors_1.colors.reset);
    }
    console.log(colors_1.colors.bgGreen, `you liked ${profile.name}`, colors_1.colors.reset);
}
function youPassed(name, reason) {
    console.log(colors_1.colors.bgYellow, `you passed ${name} :${reason}`, colors_1.colors.reset);
}
async function handleSendLike(profile) {
    const sendLikeResponse = await sendLike(profile._id);
    handleSendLikeResponse(sendLikeResponse, profile);
}
const hasCriterias = function (profile, criterias) {
    let hasAllCriterias = true;
    let reasonPassed = "";
    if ((criterias === null || criterias === void 0 ? void 0 : criterias.hasBio) && profile.bio.length === 0) {
        reasonPassed = `${reasonPassed} * no bio filled`;
        hasAllCriterias = false;
    }
    if ((criterias === null || criterias === void 0 ? void 0 : criterias.maxDistance) && (criterias === null || criterias === void 0 ? void 0 : criterias.maxDistance) <= profile.distance_mi) {
        reasonPassed = `${reasonPassed} * too far ${profile.distance_mi}km / mi`;
        hasAllCriterias = false;
    }
    if ((criterias === null || criterias === void 0 ? void 0 : criterias.hasJob) && profile.jobs.length === 0) {
        reasonPassed = `${reasonPassed} * no job filled`;
        hasAllCriterias = false;
    }
    if ((criterias === null || criterias === void 0 ? void 0 : criterias.minPics) && profile.photos.length < criterias.minPics) {
        reasonPassed = `${reasonPassed} * less than ${criterias === null || criterias === void 0 ? void 0 : criterias.minPics} pictures`;
        hasAllCriterias = false;
    }
    return { hasAllCriterias, reasonPassed };
};
async function checkCriterias(profile, criterias) {
    if (likesRemaining === 0) {
        return;
    }
    else if (!criterias) {
        await handleSendLike(profile);
        return;
    }
    const hasAllCriterias = hasCriterias(profile, criterias);
    if (hasAllCriterias.hasAllCriterias) {
        await handleSendLike(profile);
    }
    else {
        const sendPassResponse = await sendPass(profile._id);
        if (sendPassResponse) {
            youPassed(profile.name, `${hasAllCriterias.reasonPassed}`);
        }
    }
}
async function getRecommandationsResults() {
    const recommandations = await tinder_api_js_1.default.recommandation.getRecommandations();
    return (recommandations === null || recommandations === void 0 ? void 0 : recommandations.results) || [];
}
async function autoLike(criterias) {
    var e_1, _a;
    var _b;
    const profiles = await getRecommandationsResults();
    availableProfileAmount = profiles.length;
    if (availableProfileAmount > 0 && likesRemaining !== 0) {
        try {
            for (var profiles_1 = __asyncValues(profiles), profiles_1_1; profiles_1_1 = await profiles_1.next(), !profiles_1_1.done;) {
                const profile = profiles_1_1.value;
                try {
                    await timeout(2000);
                    await checkCriterias(profile, criterias);
                }
                catch (error) {
                    throw new Error(((_b = error.response) === null || _b === void 0 ? void 0 : _b.statusText) || "autoLike failed");
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (profiles_1_1 && !profiles_1_1.done && (_a = profiles_1.return)) await _a.call(profiles_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    return {
        availableProfileAmount,
        likesRemaining,
        rateLimitUntil
    };
}
exports.autoLike = autoLike;
