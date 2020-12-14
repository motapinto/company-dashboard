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
  year: number,
  suppliers: Dataset;
  numberSuppliers: Array<Data>;
  supplierQuality: Dataset;
  purchaseOrder: Array<Data>;
}

export interface QualityRatingData {
  companyName: string;
  accountID: number;
  qualityRating: number;
}

