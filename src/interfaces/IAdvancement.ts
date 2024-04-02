interface IReward {
  item: string,
  xp?: number;
}

interface IAdvancementData {
  icon: string,
  name: string,
  description: string,
  rewards?: IReward[];
}
export type {
  IReward,
  IAdvancementData
};