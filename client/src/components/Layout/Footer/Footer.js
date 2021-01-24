import './Footer.css'
import github from './github-brands.svg'
import linkedin from './linkedin-brands.svg'

const Footer = () => {
    return (
        <div className='footer'>
            <div>
                <p>Developed for purely educational purposes.</p>
            </div>
            <div className='icons'>
                <a href='https://github.com/emmawv/helping-hand' target="_blank" rel='noreferrer'><img src={github} alt='github logo' className='footer-icon' /></a>
                <a href='https://www.linkedin.com/in/emma-willett-vidal/' target="_blank" rel='noreferrer'><img src={linkedin} alt='linkedin logo' className='footer-icon' /></a>
            </div>
        </div>
    )
}

export default Footer