# tinder-auto-like

Auto like / pass recommanded profiles with or without additional filters.<br />
Using package tinder-api-js<br />
Working may 2022 - Only facebook auth.<br />

## Usage

    yarn add tinder-auto-like
    or
    npm install tinder-auto-like

in your js file :

    const { tinderAutoLike } = require("tinder-auto-like");
    // or
    import { tinderAutoLike } from "tinder-auto-like";

    const tinderAutoLikeConfig = {
        facebookAuth: {
            email:"yourFacebook@email.com",
            password: "password",
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
