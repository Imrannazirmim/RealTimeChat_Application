import React from 'react'
import Navbar from '../Common/Navbar'
import {Outlet} from 'react-router'

const RootLayout = () => {
    return (
        <>
            <Navbar/>
            <main>
                <Outlet/>
            </main>
        </>
    )
}

export default RootLayout


