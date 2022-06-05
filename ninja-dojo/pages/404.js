import React from "react"
import { Head } from "next/head"
import { useEffect } from "react"
import { useRouter } from "next/router"

const NoPage = () => {

    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            router.push('/')
        }, 2000)
    },[])

    return (
        <>
            <Head>
                <title>hi</title>
            </Head>
            <h1>hi no page here</h1>
        </>
    )
}

export default NoPage