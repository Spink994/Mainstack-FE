interface ViewsType {
  [key: string]: number;
}

interface CommonDataType {
  count: number;
  percent: number;
}

interface GraphType {
  views: ViewsType;
}

interface LocationsType extends CommonDataType {
  country: string;
}

interface SourceType extends CommonDataType {
  source: string;
}

export interface ChartDataType {
  graph_data: GraphType;
  top_locations: LocationsType[];
  top_sources: SourceType[];
}
