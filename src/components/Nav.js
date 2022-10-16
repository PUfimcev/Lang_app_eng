import { useEffect } from "react";
import { Link } from "react-router-dom";

function Nav() {
    
    useEffect(() => {
        
        let pathBrows = window.location.pathname.split(/\/*\//)[1];
        let linkPage = null;
        console.log(pathBrows);


        if (!linkPage) {
            if (pathBrows === '' || pathBrows === 'Lang_app_eng') {
                linkPage = document.querySelector(`nav a[href="/"]`);
                linkPage.classList.add('active');
            } else {
                linkPage = document.querySelector(`nav a[href="/${pathBrows}/"]`);
                linkPage.classList.add('active');
            }
        }
    });
    
    function currentPage(event) {
        let elem = event.target;
        const linkPages = document.querySelectorAll('nav a');
        if (!linkPages) return;

        linkPages.forEach(elem => {
            elem.classList.remove('active');
        });
        elem.classList.add('active');
    }
    
	return (
		<nav className="nav">
            <ul>
                <li><Link onClick={currentPage} to="/">Home</Link></li>
                <li><Link onClick={currentPage} to="/games/">Games</Link></li>
                <li><Link onClick={currentPage} to="/library/">Library</Link></li>
                <li><Link onClick={currentPage} to="/learn/">Learn</Link></li>
            </ul>
        </nav>
	);
}

export default Nav;