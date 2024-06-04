import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';

// 디스플레이 사이즈
export const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        }
    },[]);

    return windowWidth;
};

// 현재 경로에 맞는 버튼 활성화
export const useNavLocation = (path) => {
    const location = useLocation();
    if (path === '/' && location.pathname === '/') {
        return 'on'; // 루트 경로가 정확히 '/'인 경우
    } else if (path !== '/' && location.pathname.startsWith(path)) {
        return 'on'; // 다른 경로가 현재 경로로 시작하는 경우
    }
    return '';
};