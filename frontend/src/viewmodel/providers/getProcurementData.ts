import {ProcurementData, Dataset, Data, IntervalData} from "../../model/procurementData";
import {getSupplierSpending} from "./requests";
import {SpendingData} from "../../model/spendingData";

const getSuppliers = async (year: number): Promise<Dataset> => {
  const jsonRes = await getSupplierSpending(year);
  console.log(jsonRes);

  const suppliersData: Array<SpendingData> = jsonRes.data.sort((supplier1: any, supplier2: any) => supplier2.spending - supplier1.spending);

  const suppliers = {
    names: [...suppliersData.slice(0, 4).map((supplier) => supplier.companyName), "Others"],
    spending: [
      ...suppliersData.slice(0, 4).map((supplier) => supplier.spending),
      suppliersData.slice(4).reduce((accumulator, supplier) => {
        accumulator.spending += supplier.spending;
        return accumulator;
      }, {companyName: "Others", accountID: 0, spending: 0}).spending
    ]
  };

  return {
    labels: suppliers.names,
    datasets: [
      {
        data: suppliers.spending,
      },
    ],
  };
};

const getNumberSuppliers = async (year: number): Promise<Array<Data>> => {
  return [
    {
      label: "Short suppliers",
      data: [40],
    },
    {
      label: "Medium suppliers",
      data: [25],
    },
    {
      label: "Long suppliers",
      data: [70],
    },
  ];
};

const getSupplierQuality = async (year: number): Promise<Dataset> => {
  return {
    datasets: [
      {
        label: "Supplier Quality Rating",
        data: [40, 20, 13, 40, 10, 40, 38, 80, 40, 20, 14, 11],
      },
    ],
    labels: [
      "AGC",
      "Brembo",
      "ZF",
      "Fisher",
      "Sika",
      "akg",
      "IRL",
      "MOB",
      "WES",
      "AWS",
      "TES",
      "MJG",
    ],
  };
};

const getPurchaseOrder = async (year: number): Promise<Array<Data>> => {
  return [
    {
      label: "Product Order Cycle Time (days)",
      data: [123, 31, 45, 123, 25, 42, 23, 83, 112, 32, 180, 91],
    },
    {
      label: "Product Order Lead Time (days)",
      data: [91, 88, 79, 87, 93, 97, 85, 82, 79, 86, 94, 86],
    },
  ];
};

const getPurchasesInTB = async (
  year: number
): Promise<{
  totalPurchases: IntervalData;
  categories: Array<IntervalData>;
}> => {
  return {
    totalPurchases: {
      name: "",
      value: 192235,
      total: 343277,
      percentile: 0.559,
    },
    categories: [
      {
        name: "Electrical Supply",
        value: 76129,
        total: 160372,
        percentile: 0.4747,
      },
      {
        name: "Logistics",
        value: 51223,
        total: 87941,
        percentile: 0.58247,
      },
      {
        name: "Packaging",
        value: 37564,
        total: 49906,
        percentile: 0.75269,
      },
      {
        name: "Services",
        value: 27319,
        total: 45058,
        percentile: 0.6063,
      },
    ],
  };
};

export default async (year: number): Promise<ProcurementData> => {
  return {
    suppliers: await getSuppliers(year),
    numberSuppliers: await getNumberSuppliers(year),
    supplierQuality: await getSupplierQuality(year),
    purchaseOrder: await getPurchaseOrder(year),
    purchasesInTB: await getPurchasesInTB(year),
  };
};
