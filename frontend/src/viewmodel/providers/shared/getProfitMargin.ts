import ProfitMargin from "../../../model/profitMargin";

export default async(year: number): Promise<ProfitMargin> => {
  return {
    grossProfit: [86, 82, 92, 81, 86, 88, 80, 92, 88, 84, 46, 65],
    netProfit: [86, 82, 92, 81, 86, 88, 80, 92, 88, 84, 46, 65]
  };
};
