export interface Data {
  label?: string;
  data: Array<number>;
}

export interface Dataset {
  datasets: Array<Data>;
  labels: Array<string> | string;
}

export interface IntervalData {
  name: string;
  value: number;
  total: number;
  percentile: number;
}

export interface ProcurementData {
  suppliers: Dataset;
  numberSuppliers: Array<Data>;
  supplierQuality: Dataset;
  purchasesInTB: {
    totalPurchases: IntervalData;
    categories: Array<IntervalData>;
  };
  purchaseOrder: Array<Data>;
}
