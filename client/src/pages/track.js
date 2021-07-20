import { Layout, QueryResult } from '../components'
import { gql, useQuery } from '@apollo/client'
import TrackDetail from '../components/track-detail'

const GET_TRACK = gql`
  query getTrack($trackId: ID!) {
    track(id: $trackId) {
      author {
        id
        name
        photo
      }
      id
      title
      thumbnail
      length
      modulesCount
      description
      modules {
        id
        title
        length
      }
      numberOfViews
    }
  }
`

const Track = ({ trackId }) => {
  const { data, loading, error } = useQuery(GET_TRACK, {
    variables: { trackId },
  })
  return (
    <Layout>
      <QueryResult data={data} error={error} loading={loading}>
        <TrackDetail track={data?.track} />
      </QueryResult>
    </Layout>
  )
}

export default Track
