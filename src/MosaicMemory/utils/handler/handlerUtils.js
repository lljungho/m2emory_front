import Resizer from "react-image-file-resizer";

// 딤드 닫기
export const setDimmedClose = (dispatch) => {
    dispatch({
        type: 'SET_DIMMED_STATE',
        dimmedState: false,
    });
    dispatch({
        type: 'SET_MODAL_CONTENTS',
        modalContents: '',
    });
}

// sign form 변경
export const setSignFrom = (signState, dispatch) => {
    dispatch({
        type: 'SET_SIGN_STATE',
        signState: !signState
    });
    sessionStorage.setItem('sign', !signState);
};

// 컬러 모드 변경
export const setColorMode = (dispatch, colorMode) => {
    dispatch({ type: 'SET_COLOR_MODE', colorMode: !colorMode });
    localStorage.setItem('colorMode', !colorMode);
};

// 컬러 변경 적용
export const setColor = (colorMode) => {
    if(colorMode) { //dark
        document.documentElement.style.setProperty('--baseBg', '#000');
        document.documentElement.style.setProperty('--baseFg', '#fff');
        document.documentElement.style.setProperty('--baseFg1', 'rgba(255,255,255,0.1)');
        document.documentElement.style.setProperty('--baseRGB_b', 'rgba(255,255,255,0.35)');
        document.documentElement.style.setProperty('--baseBoxShadow', 'rgba(255,255,255,0.2)');

    } else { //light
        document.documentElement.style.setProperty('--baseBg', '#fff');
        document.documentElement.style.setProperty('--baseFg', '#000');
        document.documentElement.style.setProperty('--baseFg1', 'rgba(0,0,0,0.035)');
        document.documentElement.style.setProperty('--baseRGB_b', 'rgba(0,0,0,0.15)');
        document.documentElement.style.setProperty('--baseBoxShadow', 'rgba(0,0,0,0.2)');
    };
};

// 프로필 소개 텍스트 줄임
export const setTruncateText = (text, originalTextCheck, maxLine, t) => {
    if (text) {
        const maxLines = Math.floor(maxLine); // 최대 표시할 줄 수
        const lines = text.split('\n'); // 줄 단위로 나눔

        if (lines.length > maxLines && !originalTextCheck) {
            // 최대 줄 수를 초과하는 경우 텍스트 자르기
            const truncatedLines = lines.slice(0, maxLines);
            const truncatedText = truncatedLines.join('\n') + '... '; // 줄임표 추가
            return (
                <>
                    {truncatedText} 
                    <span className='moreBtn'>{t('more')}</span>
                </>
            )
        }

        return (
            // 최대 줄 수를 초과하지 않거나 원본 보기 시 원본 텍스트 반환
            <>
                {text + ' '}
                {originalTextCheck && <span className='moreBtn'>{t('less')}</span>}
            </>
        )
    }
};

// 프로필 소개 줄임 상태 확인하여 세팅
export const setTruncate = (text, setState, maxLine) => {
    if (text) {
        const maxLines = Math.floor(maxLine); // 최대 표시할 줄 수
        const lines = text.split('\n'); // 줄 단위로 나눔

        if (lines.length > maxLines) {
            setState(true);
        } else {
            setState(false);
        }
    }
};

// textarea 높이 조정
export const setAdjustHeight = (textarea, btn, minHeight, maxHeight) => {
    // textarea: 해당요소
    // btn: 버튼요소
    // minHeight: 최소높이, null = auto
    // maxHeight: 필수입력

    const textareaElem = textarea.current;
    textareaElem.style.height = minHeight ? `${minHeight}px` : 'auto';
    const hasValue = textareaElem.value !== '';
    if (hasValue) {
        textareaElem.style.height = `${Math.min(textareaElem.scrollHeight, maxHeight)}px`;
    }
    if (btn) {
        btn.current.style.display = hasValue ? 'block' : 'none';
    }
};

// 파일 체크
const maxImgsize = 1024 * 1024 * 5;
const maxVideoSize = 1024 * 1024 * 100;

// 파일 유형 검사
const isValidFileType = (file, allowedTypes) => {
    return allowedTypes.some(type => file.type.startsWith(type));
};

// 파일 사이즈 검사
const isValidFileSize = (file) => {
    if (file.type.startsWith('image/')) {
        return file.size < maxImgsize;
    } else if (file.type.startsWith('video/')) {
        return file.size < maxVideoSize;
    };
    return false;
};

// 파일 유형, 사이즈 검사
export const handleFileCheck = (file, allowedTypes) => {
    if (isValidFileType(file, allowedTypes) && isValidFileSize(file)) {
        return true;
    };
    return false;
};

// 파일 리사이징
export const handleResizeFile = (file, fileType, fileSize) =>
    new Promise((resolve) => { // 비동기 작업을 위해서 "Promise"를 통한 비동기 작업 정의
        Resizer.imageFileResizer( // Resizer의 "imageFileResize"메서드로 리사이징 및 인코딩 옵션 정의
            file,                                      
            fileSize, // 이미지 너비
            "auto", // 이미지 높이
            fileType, // 파일 형식
            90, // 이미지 퀄리티 0 ~ 100
            0, // rotation
            (uri) => {
                // resize new image with url
                resolve({ uri, fileType }); // 파일 형식 추가
            },
            "blob" // output Type = base64 | blob | file
        );
    });

// Blob을 File 객체로 변환
export const handleBlobToFile = (theBlob, fileName) => {
    // Blob()과 File()은 유사하지만, File()은 이름과 마지막 수정일 속성을 추가로 가짐   
    return new File([theBlob], fileName, { type: theBlob.type }); // Blob 객체를 File 객체로 변환
};

// 프로필 이미지 업로드 전 리사이징, 프리뷰
export const setResizerFile = async (file, ext, fileSize) => {
    const { uri, fileType } = await handleResizeFile(file, ext, fileSize); // 리사이징 파일 blob 생성
    const originFileName = file.name; // 원본 파일명
    const fileNameWithoutExtension = originFileName.substring(0, originFileName.lastIndexOf('.')); // 원본 파일명 확장자 제거
    const resizedFile = handleBlobToFile(uri, `${fileNameWithoutExtension}.${fileType}`); // blob 객체를 file 객체로 변환

    return { uri, resizedFile };
};