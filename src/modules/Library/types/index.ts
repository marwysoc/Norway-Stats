import { SavedStat } from '../../../components/BarChart'
// import { ChartOptions } from 'chart.js'

// export interface SavedStat {
//   id: any,
//   chartData: {
//     labels: string[] | undefined;
//     datasets: {
//       label: string;
//       data: number[] | undefined;
//       backgroundColor: string[];
//     }[];
//   },
//   houseType: string,
//   options: ChartOptions,
//   comment?: string
// }

export interface ChartListItemProps {
  item: SavedStat;
  key: React.Key;
}

export interface ChartSearcherFormValues {
  searchInput?: string;
  withComments: boolean;
}