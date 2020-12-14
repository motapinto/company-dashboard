import {ProcurementData, Dataset, Data, IntervalData, QualityRatingData} from "../../model/procurementData";
import {getHeader, getPurchaseOrderTimes, getSupplierQualityRatings, getSupplierSpending} from "./requests";
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
  const times = (await getPurchaseOrderTimes())?.data;

  console.log(times)

  return [
    {
      label: "Product Order Cycle Time (days)",
      data: times.cycle,
    },
    {
      label: "Product Order Lead Time (days)",
      data: times.lead,
    },
  ];
};

export default async (year: number): Promise<ProcurementData> => {
  const supplierData = await getSuppliers();

  return {
    year: await getHeader(),
    suppliers: supplierData.suppliers,
    numberSuppliers: supplierData.numberSuppliers,
    supplierQuality: await getSupplierQuality(),
    purchaseOrder: await getPurchaseOrder()
  };
};
