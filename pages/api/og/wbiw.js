/* eslint-disable @next/next/no-img-element */
/* eslint-disable import/no-anonymous-default-export */
import { ImageResponse } from "@vercel/og"

const gqlQuery = `
  query {
    MediaListCollection(
      userName: "BlankTheEvil"
      type: ANIME
      sort: STARTED_ON_DESC
    ) {
      lists {
        entries {
          media {
            coverImage {
              medium
            }
          }
        }
      }
    }
  }`

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query: gqlQuery,
    variables: {}
  })
}

export const config = {
  runtime: 'experimental-edge'
}

export default async function(req) {
  const { searchParams } = new URL(req.url)

  const title = searchParams.get('title') || 'What is Blank Watching?'

  const response = await fetch("https://graphql.anilist.co", options)
    .then(res => res.json());

  const images = []

  response.data.MediaListCollection.lists.forEach(list => {
    list.entries.forEach(entry => {
      const img = entry.media.coverImage.medium

      if (img) {
        images.push((
        <img
          style={{
            minWidth: '100px',
            minHeight: '140px',
            objectFit: 'cover',
            background: 'black',
          }}
          alt="" 
          src={img} 
          />
        ))
      }
    })
  })

  return new ImageResponse((
    <div
      style={{
        fontSize: 100,
        fontWeight: 100,
        background: 'white',
        color: 'white',
        width: '1200px',
        height: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        textShadow: '0 0 15px rgb(0 0 0/.6)',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute',
        left: 0,
        right: 0,
        background: 'black',
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}>
        {images.slice(0, 60)}
      </div>
      
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(transparent, black)',
        
      }}></div>

      <div style={{
        position: 'absolute',
        minWidth: '100%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {title}
        <span style={{
          fontSize: 30,
          opacity: 0.8,
        }}>{images.length} shows and counting...</span>
      </div>
    </div>
  ), {
    width: 1200,
    height: 600,
    headers: {
      'Cache-Control': 'max-age=0, s-maxage=300'
    }
  })
}