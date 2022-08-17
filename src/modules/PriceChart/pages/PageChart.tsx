import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import { Box } from '@mui/material'

import { BarChart } from '../../../components/BarChart'
import { GoBackButton, Loader } from '../../../components/UI'
import { houses } from '../../../consts'
import { useGraphStore } from '../../../store'
import { makeQuery } from '../../../utils'
import { useSendDataMutation } from '../../../api/send-data'

export const PageChart = (props: {}) => {
  const { start, end, house } = useParams()
  const sendData = useSendDataMutation()
  const graphStore = useGraphStore()

  const houseType = houses.filter(
    (h: { value: string; label: string }) => h.label === house
  )[0].value

  const { query } = makeQuery(start!, end!, houseType!)

  useEffect(() => {
    if (graphStore.graphData?.prices === undefined) {
      async function fetchData() {
        try {
          const apiData = await sendData.mutateAsync({
            data: query,
          })
          graphStore.setGraphData({
            prices: apiData.data.value,
            labels: query.query[3].selection.values,
          })
        } catch (error) {
          console.error(error);
        }
      }
      fetchData()
    }
  }, [])

  const navigate = useNavigate();
  const onClickGoHome = () => navigate('/');

  return (
    <>
      <Box
        sx={{
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '68px',
          marginBottom: '64px',
        }}
      >
        <GoBackButton
          sx={{
            alignSelf: 'flex-start',
            marginLeft: 1.5,
          }}
          onClickGoBack={onClickGoHome}
          label={'Back to form'}
        />
        <BarChart
          labels={graphStore.graphData?.labels}
          dataSet={graphStore.graphData?.prices}
          houseType={house}
          start={start}
          end={end}
          showSaveBtn={true}
          showCommentBtn={false}
        />
      </Box>
      {sendData.isLoading ? <Loader /> : null}
    </>
  );
};

export default PageChart;
