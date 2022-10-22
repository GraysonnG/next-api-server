/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: 'experimental-edge',
};

export default function handler() {
  return new ImageResponse((
    <div style={{
      display: "flex",
      background: 'linear-gradient(rgb(44, 43, 57), black)',
      width: '100%',
      height: '100%',
      color: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        fontSize: 20,
      }}>
        <h1 style={{
          fontSize: 80,
          margin: 0,
        }}>Blank The Evil</h1>
        <span style={{opacity: .6,}}>Software Developer and Weeb</span>
      </div>
    </div>
  ))
}