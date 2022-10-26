/* eslint-disable @next/next/no-img-element */
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

export default async function handler(req) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') || 'What is Blank Watching?'
  const response = await fetchWithCache("https://graphql.anilist.co", options)
  const imgStyles = {
    minWidth: '100px',
    minHeight: '140px',
    objectFit: 'cover',
    background: 'black',
  }
  const images = response.data.MediaListCollection.lists
    .reduce((prev, curr) => {
      prev.push(...curr.entries.map(entry => (
        <img style={imgStyles} key={entry.media.coverImage.medium} src={entry.media.coverImage.medium} alt="" />
      )))
      return prev
    }, [])

  const wrapperStyle = {
    fontSize: 90,
    fontWeight: 100,
    background: 'rgb(40,40,60)',
    color: 'white',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  }

  const containerStyle = {
    position: 'absolute',
    left: 0,
    right: 0,
    background: 'transparent',
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  }

  const gradientStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(transparent, black)',
  }

  const textContainerStyle = {
    position: 'absolute',
    minWidth: '100%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
  }

  const subtitleStyle = {
    fontSize: 30,
    opacity: 0.8,
  }

  return new ImageResponse((
    <div style={ wrapperStyle }>
      <div style={ containerStyle }>
        { images.slice(0, 60) }
      </div>
      <div style={ gradientStyle }></div>
      <div style={ textContainerStyle }>
        { title }
        <span style={ subtitleStyle }>{ images.length } shows and counting...</span>
      </div>
    </div>
  ),{
    headers: {
      'Cache-Control': 'max-age=0, s-maxage=5'
    }
  })
}