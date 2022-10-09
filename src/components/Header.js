import Nav from './Nav';
import { Link } from "react-router-dom";
import Logo from '../images/Icon.svg';

function Header() {

	function page() {
        const linkPage = document.querySelector(`nav a[href="/"]`);
		if (!linkPage) return;
		const linkPages = document.querySelectorAll('nav a');
		if (!linkPages) return;
    
        linkPages.forEach(elem => {
        elem.classList.remove('active');
        });
		linkPage.classList.add('active');
    }

	return (
		<header className="header">
			<div className='container'>
					<div className='header__content'>
						<Link onClick={page} className="header__logo" to="/"><img src={Logo} alt="Company" /></Link>
						<Nav />
					</div>
			</div>
		</header>
	);
}

export default Header;