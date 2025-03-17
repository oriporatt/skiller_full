import { useSelector } from 'react-redux'
import Linkdn from '../assets/svgs/linkdn.svg?react'
import Email from '../assets/svgs/email.svg?react'
import { Link, NavLink ,useLocation} from 'react-router-dom'

export function AppFooter() {
	const count = useSelector(storeState => storeState.userModule.count)

	return (
		<footer className="app-footer">

			<div className='footer-elements  main-container'>
				<div className='footer-line'></div>
				<div className='elements-items'>
					<p className="skiller-logo-footer">skiller<span>.</span></p>
					<p className="skiller-text-footer">© Skiller 2025</p>
					<div className='svgs-links'>
						<a href="mailto:oriporatt@gmail.com"><Email className='email'/></a>
						<a href="https://www.linkedin.com/in/ori-porat-a36298197/"><Linkdn className='linkdn'/></a>
						
					</div>
				</div>
				

			</div>

		</footer>
	)
}