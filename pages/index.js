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
      <div>
        Welcome to Blanks Server!
        <div style={{
          display: "flex",
          fontSize: 20,
          textAlign: "center",
          opacity: 0.6,
          justifyContent: "center"
        }}>
          <a style={{textDecoration: "underline"}} href="/api">/api</a>
        </div>
      </div>
    </div>
  )
}
