import { SavedStat } from '../../../components/BarChart'

export interface ChartListItemProps {
  item: SavedStat;
  key: React.Key;
}

export interface ChartSearcherFormValues {
  searchInput?: string;
  withComments: boolean;
}