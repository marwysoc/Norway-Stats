import { Typography } from "@mui/material"

import { DescribeTxtProps } from "../"

export const DescribeText: React.FC<DescribeTxtProps> = (props) => {
    return (
        <>
            {
                props.primaryTxt &&
                <Typography variant='h3' component='div'>
                    {props.primaryTxt}
                </Typography>
            }
            {
                props.secondaryTxt &&
                <Typography sx={{ marginBottom: 2 }} variant='subtitle1' gutterBottom component='div'>
                    {props.secondaryTxt}
                </Typography>
            }
        </>

    )
}

export default DescribeText