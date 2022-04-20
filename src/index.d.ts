import { TinderAutoLikeConfig } from "./types/tinderAutoLike";
import { Criterias } from "./types/feelings";

export interface TinderAutoLike {
  tinderAutoLike: (config: TinderAutoLikeConfig) => Promise<boolean>;
  startAutoLike: (criterias: Criterias) => void;
}
