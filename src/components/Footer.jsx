import React from 'react';

const Footer = () => {
    return (
		<footer className="footer footer-center bg-base-300 text-base-content p-4">
			<aside>
				<p>
					Copyright © {new Date().getFullYear()} - All right reserved
					by Easy Shopping
				</p>
			</aside>
		</footer>
	);
};

export default Footer;