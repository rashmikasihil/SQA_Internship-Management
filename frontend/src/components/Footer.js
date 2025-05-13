import React from 'react';

const Footer = () => {
    return (
        <footer style={{ textAlign: 'center', padding: '1em 0', background: '#f1f1f1' }}>
            <p>&copy; {new Date().getFullYear()} Samitha&Co. All rights reserved.</p>
        </footer>
    );
};

export default Footer;