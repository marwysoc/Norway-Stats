import { ChartOptions } from 'chart.js'

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
    comment?: string;
}

export interface ChartProps {
    labels?: string[];
    dataSet?: number[];
    start?: string;
    end?: string;
    showSaveBtn: boolean;
    showCommentBtn: boolean;
    comment?: string | null | undefined;
    id?: any;
    houseType: string | undefined;
    key?: React.Key | null | undefined;
}

export interface CommentSectionProps {
    comment: string | null | undefined;
    id: any;
}

export interface CommentFormValues {
    comment: string;
}

export interface CommentProps {
    onEditBtnClick: () => void;
    comment: string;
}