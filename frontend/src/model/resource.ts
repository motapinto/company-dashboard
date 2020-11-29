export default class Resource<T> {
  data?: T;
  isFilled: boolean;
  failed: boolean;
  constructor(data?: T, failed?: boolean) {
    this.isFilled = !!data;
    this.failed = failed || false;
    this.data = data;
  }
}
