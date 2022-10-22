/* eslint-disable @next/next/no-img-element */
/* eslint-disable import/no-anonymous-default-export */
import { ImageResponse } from "@vercel/og"
import cacheData from "memory-cache"

export const config = {
  runtime: 'experimental-edge',
};

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

const CACHE_TIME = 30000

const fetchWithCache = async (url, options) => {
  const cachedData = cacheData.get("listData")
  if (cachedData) {
    return cachedData
  } else {
    const response = await fetch(url, options)
    const data = await response.json()
    cacheData.put("listData", data, CACHE_TIME)
    return data
  }
}


export default async function(req) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') || 'What is Blank Watching?'
  const data = await fetchWithCache("https://graphql.anilist.co", options)
  const images = []

  data.data.MediaListCollection.lists.forEach(list => {
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
        background: 'rgb(40,40,60)',
        color: 'white',
        width: '100%',
        height: '100%',
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
        background: 'transparent',
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}>
        { images.slice(0, 60) }
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
        }}>{ images.length } shows and counting...</span>
      </div>
    </div>
  ))
}