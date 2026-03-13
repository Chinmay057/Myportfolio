import { useState, useEffect } from 'react';

export function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const isNarrow = window.innerWidth < 768;
            const isTouch = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
            setIsMobile(isNarrow || isTouch);
        };

        // Check initially
        checkMobile();

        // Check on resize
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isMobile;
}
