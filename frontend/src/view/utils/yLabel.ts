import {formatNumber} from "../pages/Procurement";

export default (value: number, _index: number, _values: Array<any>) => {
  return `$ ${formatNumber(value)}`;
};
