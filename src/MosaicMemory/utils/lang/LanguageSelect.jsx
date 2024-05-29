import React, { useState, useEffect, useRef } from 'react'
import { getNowLanguage, getLanguages, getLanguageNames, changeLanguage } from './languageUtils';

const LanguageSelect = () => {
    // 언어
    const nowLanguage = getNowLanguage(); // 현재 적용되어 있는 언어
    const languages = getLanguages(); // 적용가능한 언어 리스트
    const languageNames = getLanguageNames(); // 언어명

    // 언어 선택 리스트 박스
    const [menuOpen, setMenuOpen] = useState(false);
    const menuOpenBtn = useRef(null);

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        // 클릭한 요소 외 클릭 시
        const outsideClick = (e) => {
            if (menuOpen && menuOpenBtn.current && !menuOpenBtn.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };

        window.addEventListener('click', outsideClick);

        return () => {
            window.removeEventListener('click', outsideClick);
        }
    }, [menuOpen]);    

    return (
        <div 
            className={`util_icon_boxs ${menuOpen ? 'on' : ''}`} 
            ref={menuOpenBtn} 
            onClick={handleMenuToggle}
        >
            <img 
                src={`/images/icon/lng_${nowLanguage}.png`} 
                className='lng_icon' 
                alt={ languageNames[nowLanguage] || nowLanguage } 
            />

            <div className="language_icons">
                {languages.map((lng, index) => (
                    <div 
                        key={index} 
                        className="lng_btns" 
                        onClick={() => changeLanguage(lng)}
                    >
                        <img 
                            src={`/images/icon/lng_${lng}.png`} 
                            className='lng_icon' 
                            alt={ languageNames[lng] || lng } 
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LanguageSelect;