export class AnalyticsDataModel {
  total?: number;
  amout?: number;
  charts?: Array<any>;
  color?: string;
  position?: {
    w?: number;
    h?: number;
    x?: number;
    y?: number;
  };
  route?: AnalyticsDataModel;
  hour?: AnalyticsDataModel;
}
