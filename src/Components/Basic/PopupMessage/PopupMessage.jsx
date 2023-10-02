import React, { useEffect, useState } from 'react';
import './Popup.css';

const PopUp = ({ message, show, duration = 3000, fontColor = '#fff', fontSize = '16px', fontWeight = 'normal' }) => {
    const [visible, setVisible] = useState(show);

    useEffect(() => {
        if (show) {
            setVisible(true);
            const timeout = setTimeout(() => {
                setVisible(false);
            }, duration);
            return () => clearTimeout(timeout);
        }
    }, [show, duration]);

    const styles = {
        color: fontColor,
        fontSize: fontSize,
        fontWeight: fontWeight,
    };

    return (
        <div className={`popup ${visible && show ? 'show' : ''}`} style={styles}>
            {message}
        </div>
    );
};

export default PopUp;
