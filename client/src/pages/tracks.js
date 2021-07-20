import React from 'react'
import { Layout, QueryResult } from '../components'
import { gql, useQuery } from '@apollo/client'
import TrackCard from '../containers/track-card'

const TRACKS = gql`
  query getTracks {
    tracksForHome {
      id
      length
      thumbnail
      title
      modulesCount
      author {
        name
        id
        photo
      }
    }
  }
`

const Tracks = () => {
  const { data, loading, error } = useQuery(TRACKS)

  return (
    <Layout grid>
      <QueryResult data={data} error={error} loading={loading}>
        {data?.tracksForHome?.map((track, idx) => (
          <TrackCard key={idx} track={track} />
        ))}
      </QueryResult>
    </Layout>
  )
}

export default Tracks
