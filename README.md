# tinder-auto-like

Auto like / pass recommanded profiles with or without additional filters.<br />
Using package tinder-api-js<br />
Working April 2022 - Only facebook auth.<br />
Get your facebook id here : https://lookup-id.com/<br />
Get facebook header here :<br />

    https://www.facebook.com/dialog/oauth?client_id=464891386855067&redirect_uri=https://www.facebook.com/connect/login_success.html&scope=basic_info,email,public_profile,user_about_me,user_activities,user_birthday,user_education_history,user_friends,user_interests,user_likes,user_location,user_photos,user_relationship_details&response_type=token

## Usage

    yarn add tinder-auto-like
    or
    npm install tinder-auto-like

in your js file :

    const { tinderAutoLike } = require("tinder-auto-like");

or
import { tinderAutoLike } from "tinder-auto-like";

    const tinderAutoLikeConfig = {
        facebookAuth: {
            token:
            "EAAGm0PX4ZCpsBAMXM4arasj7iEYg2DI5UCI7a28AE0WcIw3YdgmfyMlXrn8bVnEy5Iz1wPsFIjrco1PmKXKwdPPdTkedqbQqLdy3aVoifnSMVvX2z9qKLXQD8ZAPrgEsFOruh2XYJEGYMQzZB4QnMACpn5LZBiY1HiNQCk5qei1ww9roiJJZB",
            facebook_id: "1651500123",
        },
        // criterias are optional
        criterias: {
            hasBio: true,
            hasJob: false,
            minPics: 3,
        },
    };

    tinderAutoLike(tinderAutoLikeConfig);

Then yarn start or npm start.
