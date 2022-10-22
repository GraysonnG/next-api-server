import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      display: "grid",
      placeItems: "center",
      fontSize: 50,
      background: 'rgb(20, 20, 30)',
    }} className={styles.container}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
      }}>
        Welcome to Blanks Server!
        <div style={{
          display: "flex",
          fontSize: 20,
          textAlign: "center",
          opacity: 0.6,
          justifyContent: "center"
        }}>
          <Link style={{textDecoration: "underline"}} href="/api">/api</Link>
        </div>
        <img style={{
          display: 'inline-block',
          width: 300,
          aspectRatio: "2/1",
        }} src="/api/og/wbiw" alt="icon" />
        <img style={{
          display: 'inline-block',
          width: 300,
          aspectRatio: "2/1",
        }} src="/api/og/bte" alt="icon" />
      </div>
    </div>
  )
}
