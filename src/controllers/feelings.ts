import tinderApi from "tinder-api-js";
import { Criterias, Feeling, AutoLike, HasCriterias } from "../types/feelings";
import { Result } from "../types/recommandations";
import { colors } from "../utils/colors";

let likesRemaining = -1;
let availableProfileAmount = -1;
let rateLimitUntil = -1;

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function sendLike(id: string) {
  try {
    const myLike = await tinderApi.feeling.like(id);
    availableProfileAmount = availableProfileAmount - 1;
    return myLike;
  } catch (error: any) {
    throw new Error(error.response?.statusText || "sendLike failed");
  }
}

async function sendPass(id: string) {
  try {
    const myPass = await tinderApi.feeling.pass(id);
    availableProfileAmount = availableProfileAmount - 1;
    return myPass;
  } catch (error: any) {
    throw new Error(error.response?.statusText || "sendPass failed");
  }
}

function handleSendLikeResponse(sendLikeResponse: Feeling, profile: Result) {
  likesRemaining = sendLikeResponse.likes_remaining;
  rateLimitUntil = sendLikeResponse.rate_limited_until;
  if (sendLikeResponse.match) {
    console.log(colors.bgCyan, "you have a match!", colors.reset);
  }
  console.log(colors.bgGreen, `you liked ${profile.name}`, colors.reset);
}
function youPassed(name: string, reason: string) {
  console.log(colors.bgYellow, `you passed ${name} : ${reason}`, colors.reset);
}
async function handleSendLike(profile: Result) {
  const sendLikeResponse = await sendLike(profile._id);
  handleSendLikeResponse(sendLikeResponse, profile);
}
const hasCriterias = function (
  profile: Result,
  criterias?: Criterias
): HasCriterias {
  let hasAllCriterias = true;
  let reasonPassed = "";
  if (criterias?.hasBio && profile.bio.length === 0) {
    reasonPassed = `${reasonPassed} no bio filled`;
    hasAllCriterias = false;
  }
  if (criterias?.maxDistance && criterias?.maxDistance <= profile.distance_mi) {
    reasonPassed = `${reasonPassed} too far ${profile.distance_mi}km / miles`;
    hasAllCriterias = false;
  }
  if (criterias?.hasJob && profile.jobs.length === 0) {
    reasonPassed = `${reasonPassed} no job filled`;
    hasAllCriterias = false;
  }
  if (criterias?.minPics && profile.photos.length < criterias.minPics) {
    reasonPassed = `${reasonPassed} less than ${criterias?.minPics} pictures`;
    hasAllCriterias = false;
  }
  return { hasAllCriterias, reasonPassed };
};
async function checkCriterias(profile: Result, criterias?: Criterias) {
  if(likesRemaining === 0){
    return;
  }
  else if (!criterias) {
    await handleSendLike(profile);
    return;
  }
  const hasAllCriterias = hasCriterias(profile, criterias);
  if (hasAllCriterias.hasAllCriterias) {
    await handleSendLike(profile);
  } else {
    const sendPassResponse = await sendPass(profile._id);
    if (sendPassResponse) {
      youPassed(profile.name, `${hasAllCriterias.reasonPassed}`);
    }
  }
}

async function getRecommandationsResults() {
  const recommandations = await tinderApi.recommandation.getRecommandations();
  return recommandations?.results || [];
}

export async function autoLike(
  criterias?: Criterias
): Promise<AutoLike> {
  const profiles = await getRecommandationsResults();
  availableProfileAmount = profiles.length;
  if (availableProfileAmount > 0 && likesRemaining !== 0) {
    for await (const profile of profiles) {
      try {
        await timeout(2000);
        await checkCriterias(profile, criterias);
      } catch (error: any) {
        throw new Error(error.response?.statusText || "autoLike failed");
      }
    }
  }
  return {
    availableProfileAmount,
    likesRemaining,
    rateLimitUntil
  };
}
