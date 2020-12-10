import SalesRegionData from "../../../model/salesRegionData";
import {getSalesByRegion} from "../requests";

export const getSalesRegion = async(): Promise<SalesRegionData> => {
  const salesByRegionData = (await getSalesByRegion()).data;

  return {
    // @ts-ignore
    regions: [...salesByRegionData.map((region) => region.name).slice(0, 4), "Others"],
    // @ts-ignore
    data: [...salesByRegionData.map((region) => region.sales).slice(0, 4), salesByRegionData.slice(4).reduce((previousValue, currentValue) => previousValue + currentValue.sales, 0)]
  };
}
