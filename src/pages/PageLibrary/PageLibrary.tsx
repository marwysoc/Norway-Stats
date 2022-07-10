import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import { ChartOptions } from 'chart.js'
import { Typography, Box } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PriceChart from '../../components/PriceChart/PriceChart'

interface SavedStat {
  id: any,
  chartData: {
    labels: string[] | undefined;
    datasets: {
      label: string;
      data: number[] | undefined;
      backgroundColor: string[];
    }[];
  },
  houseType: string,
  options: ChartOptions,
  comment?: string
}

export const PageLibrary: React.FC = () => {
  const savedStats: SavedStat[] = JSON.parse(localStorage.getItem('savedStats') || '[]') || []

  const navigate = useNavigate()
  const onClickGoHome = () => navigate('/')

  return (
    <Box
      sx={{
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '68px',
        marginBottom: '64px'
      }}>
      <Button
        sx={{
          alignSelf: 'flex-start',
          marginLeft: 1.5
        }}
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={onClickGoHome}
      >
        Back to form
      </Button>
      <Typography
        variant='h4'
        gutterBottom
        component='div'>Library</Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        {
          savedStats.length === 0 ? (
            <Typography
              variant='h6'
              gutterBottom
              component='div'>No statistics in the library. Go to form page to generate some and save them.</Typography>
          ) : (
            savedStats.map((stat) => (
              <PriceChart
                key={Math.random()}
                labels={stat.chartData.labels}
                dataSet={stat.chartData.datasets[0].data}
                start={stat.chartData!.labels![0]}
                houseType={stat.houseType}
                end={stat.chartData!.labels![stat.chartData!.labels!.length - 1]}
                showSaveBtn={false}
                showCommentBtn={true}
                comment={stat.comment ? stat.comment : null}
                id={stat.id}
              />
            ))
          )
        }
      </Box>
    </Box>

  )
}

export default PageLibrary