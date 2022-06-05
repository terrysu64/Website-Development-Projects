import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'


export const getStaticProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  console.log(res.json())
}

export default function Home({users}) {
  console.log('d')
  console.log(users)

  return (
    <div>
      <div>homepage</div>
    </div>
  )
}
