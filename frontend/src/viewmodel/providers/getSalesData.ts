import SalesData from "../../model/salesData";
import getProfitMargin from "./shared/getProfitMargin";
import getTopProducts from "./shared/getTopProducts";
import { getSalesRegion } from "./shared/getSalesByRegion";
import { getAOV, getCOGS, getHeader } from "./requests";

const assembleCOGS = async (): Promise<Array<number>> => {
  const request = await getCOGS();
  return request.data.cogs;
};

const assembleAOV = async (): Promise<Array<number>> => {
  const request = await getAOV();
  return request.data.aov;
};

export default async (): Promise<SalesData> => {
  return {
    year: await getHeader(),
    cogs: await assembleCOGS(),
    aov: await assembleAOV(),
    profitMargin: await getProfitMargin(),
    salesRegion: await getSalesRegion(),
    topProducts: await getTopProducts(),
  };
};
