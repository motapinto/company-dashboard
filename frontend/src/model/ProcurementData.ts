import IntervalData from "./intervalData";
import Data from "./Data";
import Dataset from "./Dataset";

export default interface ProcurementData {
  suppliers: Dataset;
  numberSuppliers: Array<Data>;
  supplierQuality: Dataset;
  purchasesInTB: {
    totalPurchases: IntervalData;
    categories: Array<IntervalData>;
  };
  purchaseOrder: Array<Data>;
}
