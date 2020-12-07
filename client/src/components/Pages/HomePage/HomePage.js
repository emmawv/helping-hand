import { Link } from 'react-router-dom'
import {Video} from 'react'

import './HomePage.css'

const HomePage = () => {
    return (
        <>
            <section className="hero">
            <video playsinline autoPlay muted loop className="videoTag">
            <source src="https://res.cloudinary.com/djqsmqs26/video/upload/v1607365473/helping-hand/Pexels_Videos_1723017_1_rtp1hb.mp4" type="video/mp4" />
            </video>
            <div>
                <h1>Need a hand?</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                <Link to='#' className="button">Start searching for a professional</Link>
            </div>
            </section>
            <section className="info">
                <div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                </div>
                <div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                </div>
                <div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                </div>
            </section>
        </>
    )
}

export default HomePage