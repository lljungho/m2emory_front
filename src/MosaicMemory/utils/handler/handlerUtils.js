// 컬러 모드 변경
export const setColorMode = (dispatch, colorMode) => {
    dispatch({ type: 'SET_COLOR_MODE', colorMode: !colorMode });
    localStorage.setItem('colorMode', !colorMode);
};

// 컬러 변경 적용
export const setColor = (colorMode) => {
    if(colorMode) { //dark
        document.documentElement.style.setProperty('--baseBg', '#000');
        document.documentElement.style.setProperty('--baseBg1', '#262626');
        document.documentElement.style.setProperty('--baseFg', '#fff');
        document.documentElement.style.setProperty('--baseFg1', 'rgba(255,255,255,0.15)');
        document.documentElement.style.setProperty('--baseRGB_b', 'rgba(255,255,255,0.35)');
        document.documentElement.style.setProperty('--baseRGB_b1', 'rgba(255,255,255,0.85)');
        document.documentElement.style.setProperty('--baseBoxShadow', '#000');

    } else { //light
        document.documentElement.style.setProperty('--baseBg', '#fff');
        document.documentElement.style.setProperty('--baseBg1', '#fff');
        document.documentElement.style.setProperty('--baseFg', '#000');
        document.documentElement.style.setProperty('--baseFg1', 'rgba(0,0,0,0.04)');
        document.documentElement.style.setProperty('--baseRGB_b', 'rgba(0,0,0,0.15)');
        document.documentElement.style.setProperty('--baseRGB_b1', 'rgba(0,0,0,0.35)');
        document.documentElement.style.setProperty('--baseBoxShadow', 'rgba(0,0,0,0.15)');
    };
};

// 프로필 소개 텍스트 줄임
export const truncateText = (text, originalText, btnTxt) => {
    if (text) {
        const maxHeight = 100; // 최대 높이
        const lineHeight = 16; // line-height 값
        const maxLines = Math.floor(maxHeight / lineHeight); // 최대 표시할 줄 수
        const lines = text.split('\n'); // 줄 단위로 나눔

        if (lines.length > maxLines && !originalText) {
            // 최대 줄 수를 초과하는 경우 텍스트 자르기
            const truncatedLines = lines.slice(0, maxLines - 1); // 마지막 줄은 줄임표로 대체하기 때문에 -1
            const truncatedText = truncatedLines.join('\n'); // 줄임표 추가
            return (
                <>
                    {truncatedText} 
                    <span className='moreBtn'>...<span className='moreTxt'> {btnTxt}</span></span>
                </>
            )
        }

        return text; // 최대 줄 수를 초과하지 않는 경우 원본 텍스트 반환
    }
};

// 프로필 소개 줄임 상태 확인하여 세팅
export const setTruncate = (text, setTextTruncated) => {
    if (text) {
        const maxHeight = 100; // 최대 높이
        const lineHeight = 16; // line-height 값
        const maxLines = Math.floor(maxHeight / lineHeight); // 최대 표시할 줄 수
        const lines = text.split('\n'); // 줄 단위로 나눔

        if (lines.length > maxLines) {
            setTextTruncated(true);
        } else {
            setTextTruncated(false);
        }
    }
};

// 딤드 닫기
export const handleDimmedClose = (dispatch) => {
    dispatch({
        type: 'SET_DIMMED_STATE',
        dimmedState: false,
    });
    dispatch({
        type: 'SET_MODAL_CONTENTS',
        modalContents: '',
    });
}
