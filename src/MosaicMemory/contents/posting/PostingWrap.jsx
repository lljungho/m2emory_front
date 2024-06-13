import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { handleFileCheck, setAdjustHeight } from '../../utils/handler/handlerUtils';

import ContTitleBox from '../../include/contents/ContTitleBox';

const PostingWrap = () => {
    const { t } = useTranslation();
    const postInput = useRef(null);
    const mediaFile = useRef(null);
    const description = useRef(null);
    const params = useParams();

    // 포스팅할 콘텐츠 선택
    const [posting, setPosting] = useState(Number(params.post));

    // 댓글 입력 시 textarea 높이 조정
    const adjustHeight = () => {
        setAdjustHeight(description, null, null, 130);
    };

    // 파일 인풋 데이터 체크
    const [isFileCheck, setIsFileCheck] = useState(false);
    const fileCheck = () => {
        const files = Array.from(mediaFile.current.files); // 배열로 만들기

        // 파일 유형, 사이즈 검사
        const invalidFiles = files.filter(file => !handleFileCheck(file, ['image/', 'video/']));

        // 유형, 사이즈 부적합 파일이 있을 경우
        if (invalidFiles.length > 0) {
            alert(t('invalidFileWarning'));
            mediaFile.current.value = '';
            return;
        }

        setIsFileCheck(true);
    };

    return (
        <div className='content_info_box'>
            <ContTitleBox
                title={t('post')}
                back={true}
            />

            <div className="contentInfoBox wrapElement">
                <input 
                    type="hidden" 
                    name="post" 
                    ref={postInput} 
                    defaultValue={posting} 
                />
                <div className="contInfo_tabBtnBox">
                    <div 
                        className={`tabBtns ${posting === 1 ? 'btns on' : 'innerElement off'}`}
                        onClick={() => setPosting(1)}
                    >
                        <p className="tab">갤러리</p>
                    </div>
                    <div 
                        className={`tabBtns ${posting === 2 ? 'btns on' : 'innerElement off'}`}
                        onClick={() => setPosting(2)}
                    >
                        <p className="tab">스토리</p>
                    </div>
                </div>
            </div>

            <div className="contMediaBox wrapElement">
                <div className="contMedia_viewBox border">
                    <input 
                        type="file" 
                        id='mediaFile' 
                        className='displayNone' 
                        ref={mediaFile}
                        accept='image/*, video/*'
                        multiple
                        onChange={fileCheck}
                    />

                    { isFileCheck ?
                    <div className="mediaBtnsBox">
                        <div className="funcBtnsBox">
                            <div className='bdBtns'>{t('del')}</div>
                            <div className='bdBtns'>{t('modify')}</div>
                            <div className='bdBtns'>{t('delAll')}</div>
                        </div>
                    </div>
                    :
                    <label htmlFor="mediaFile" className="mediaSelectBtnBox txtBtns">
                        {t('mediaSelect')}
                        <p className="subtxt">{t('fileAcceptMedia')}</p>
                    </label>
                    }   
                </div>
            </div>

            <div className="contentInfoBox">
                <div className="descriptionInputBox">
                    <textarea 
                        name="description" 
                        ref={description} 
                        className='editInput innerElement border' 
                        placeholder={t('enterDescription')}
                        onInput={adjustHeight}
                    >
                    </textarea>
                </div>
            </div>

            <div className="btns_box">
                <button type="button" className='btns'>{t('submit')}</button>
            </div>
        </div>
    )
}

export default PostingWrap;