import { ChartOptions } from 'chart.js'
import { CommentData } from '../../../store/saveStatStore';

export interface DataSet {
    label: string;
    data?: number[];
    backgroundColor: string[];
}

export interface ChartData {
    labels?: string[];
    datasets: DataSet[];
}

export interface SavedStat {
    id: any;
    houseType?: string;
    chartData: ChartData;
    options: ChartOptions;
    comment?: CommentData | undefined | null;
    statOwner: string | undefined;
}

export interface ChartProps {
    labels?: string[];
    dataSet?: number[];
    start?: string;
    end?: string;
    showSaveBtn: boolean;
    showCommentBtn: boolean;
    id?: any;
    houseType: string | undefined;
    key?: React.Key | null | undefined;
}

export interface CommentSectionProps {
    id: any;
}

export interface CommentFormValues {
    comment: string;
}