export declare type TinderAutoLikeConfig = {
    facebookAuth: {
        email: string;
        password: string;
    };
    criterias: {
        hasBio?: boolean;
        hasJob?: boolean;
        minPics?: number;
        maxDistance?: number;
    };
};
