export interface DescribeTxtProps {
    primaryTxt?: string;
    secondaryTxt?: string;
}

export interface PropertyFormProps {
    // onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onSubmit: any;
}

export interface InputDescriberProps {
    describerTxt: string;
}

export interface FormValues { 
    startYear: string;
    endYear: string;
    startQuarter: string;
    endQuarter: string;
    houseType: string;
}