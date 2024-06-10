import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next';
import { setAdjustHeight } from '../../utils/handler/handlerUtils';

import ContTitleBox from '../../include/contents/ContTitleBox';

const PostingWrap = () => {
    const { t } = useTranslation();
    const mediaFile = useRef(null);
    const description = useRef(null);

    // 댓글 입력 시 textarea 높이 조정
    const adjustHeight = () => {
        setAdjustHeight(description, null, null, 130);
    };

    // 파일 인풋 데이터 체크
    const fileCheck = () => {
        const files = Array.from(mediaFile.current.files);

        // 파일 형식 검사 (이미지, 동영상 타입이 아닌 파일이 있을 시 취소)
        const isValidFileType = (file) => {
            return file.type.startsWith('image/') || file.type.startsWith('video/');
        };
        const invalidFiles = files.filter(file => !isValidFileType(file));

        if (invalidFiles.length > 0) {
            alert(t('invalidFileWarning'));
            mediaFile.current.value = '';
            return;
        }
    };

    return (
        <div className='content_info_box'>
            <ContTitleBox
                title={t('post')}
                back={true}
            />

            <div className="contentInfoBox wrapElement">
                <div className="contInfo_tabBtnBox">
                    <div className="tabBtns btns">
                        <p className="tab">갤러리</p>
                    </div>
                    <div className="tabBtns innerElement">
                        <p className="tab">스토리</p>
                    </div>
                </div>
            </div>

            <div className="contMediaBox wrapElement">
                <div className="contMedia_viewBox">
                    <input 
                        type="file" 
                        id='mediaFile' 
                        className='displayNone' 
                        ref={mediaFile}
                        accept='image/*, video/*'
                        multiple
                        onChange={fileCheck}
                    />
                    <label htmlFor="mediaFile" className="mediaSelectBtnBox txtBtns">
                        {t('mediaSelect')}
                        <p className="subtxt">{t('fileAcceptMedia')}</p>
                    </label>
                </div>
            </div>

            <div className="contentInfoBox">
                <div className="descriptionInputBox">
                    <textarea 
                        name="description" 
                        ref={description} 
                        className='editInput innerElement' 
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

export default PostingWrap