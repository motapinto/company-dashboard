import {ProcurementData, Dataset, Data, IntervalData, QualityRatingData} from "../../model/procurementData";
import {getHeader, getSupplierQualityRatings, getSupplierSpending} from "./requests";
import {SpendingData} from "../../model/spendingData";

const getSuppliers = async (): Promise<{suppliers: Dataset, numberSuppliers: Array<Data>}> => {
  const jsonRes = await getSupplierSpending();

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

  const longTerm = []
  suppliersData.forEach((spendingData) => {
    if(spendingData.spending > 100000)
      longTerm.push(spendingData);
  });

  const mediumTerm = []
  suppliersData.forEach((spendingData) => {
    if(spendingData.spending > 1000 && spendingData.spending <= 100000)
      mediumTerm.push(spendingData);
  });

  const shortTerm = []
  suppliersData.forEach((spendingData) => {
    if(spendingData.spending < 1000)
      shortTerm.push(spendingData);
  });



  return {
    suppliers: {
      labels: suppliers.names,
      datasets: [
        {
          data: suppliers.spending,
        },
      ],
    },
    numberSuppliers: [
      {
        label: "Low transactions",
        data: [shortTerm.length],
      },
      {
        label: "Medium transactions",
        data: [mediumTerm.length],
      },
      {
        label: "High transactions",
        data: [longTerm.length],
      },
    ]
  };
};

const getSupplierQuality = async (): Promise<Dataset> => {
  const supplierQualityRating: Array<QualityRatingData> = (await getSupplierQualityRatings()).data;

  console.log( supplierQualityRating.slice(0, 12).map((qualityRatingData) => {
    return qualityRatingData.qualityRating
  }))
  return {
    datasets: [
      {
        label: "Supplier Quality Rating",
        data: supplierQualityRating.slice(0, 12).map((qualityRatingData) => {
          return qualityRatingData.qualityRating * 100
        }),
      },
    ],
    labels: supplierQualityRating.slice(0, 12).map((qualityRatingData) => {
      return qualityRatingData.companyName.slice(0, 10)
    }),
  };
};

const getPurchaseOrder = async (): Promise<Array<Data>> => {
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

const getPurchasesInTB = async (): Promise<{
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
  const supplierData = await getSuppliers();

  return {
    year: await getHeader(),
    suppliers: supplierData.suppliers,
    numberSuppliers: supplierData.numberSuppliers,
    supplierQuality: await getSupplierQuality(),
    purchaseOrder: await getPurchaseOrder(),
    purchasesInTB: await getPurchasesInTB(),
  };
};
