import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";

const ContentTopWrap = () => {
    const slideContents = [
        {
            title: "aweoifj.3_3123123",
            imageURL: "/images/image/test.jpg",
        },
        {
            title: "aweoifj.3_3123123",
            imageURL: "/images/image/test2.jpg",
        },
        {
            title: "aweoifj.3_3",
            imageURL: "/images/image/test3.jpg",
        },
        {
            title: "aweoifj.3_3",
            imageURL: "/images/image/test4.jpg",
        },
        {
            title: "aweoifj.3_3",
            imageURL: "/images/image/test.jpg",
        },
        {
            title: "aweoifj.3_3",
            imageURL: "/images/image/test2.jpg",
        },
        {
            title: "aweoifj.3_3",
            imageURL: "/images/image/test3.jpg",
        },
        {
            title: "aweoifj.3_3",
            imageURL: "/images/image/test4.jpg",
        },
        {
            title: "aweoifj.3_3",
            imageURL: "/images/image/test.jpg",
        },
        {
            title: "aweoifj.3_3123123",
            imageURL: "/images/image/test2.jpg",
        },
        {
            title: "aweoifj.3_3",
            imageURL: "/images/image/test3.jpg",
        },
        {
            title: "aweoifj.3_3",
            imageURL: "/images/image/test4.jpg",
        },
        {
            title: "aweoifj.3_3",
            imageURL: "/images/image/test.jpg",
        },
        {
            title: "aweoifj.3_3",
            imageURL: "/images/image/test2.jpg",
        },
        {
            title: "aweoifj.3_3",
            imageURL: "/images/image/test3.jpg",
        },
        {
            title: "aweoifj.3_3",
            imageURL: "/images/image/test4.jpg",
        },
        {
            title: "aweoifj.3_3",
            imageURL: "/images/image/test.jpg",
        },
    ];

    return (
        <div className="contentTopBox">
            <div className="contentTopInfo">
                <div className="storyBox">
                    <Swiper 
                        speed={300}
                        slidesPerView={4}
                        spaceBetween={10}
                        slidesPerGroup={3}
                        navigation={{
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        }}
                        breakpoints={{
                            1290:{
                                slidesPerView: '10.5'
                            },
                            1170:{
                                slidesPerView: '8.5'
                            },
                            1025:{
                                slidesPerView: '7'
                            },
                            850:{
                                slidesPerView: '11'
                            },
                            720:{
                                slidesPerView: '10'
                            },
                            660:{
                                slidesPerView: '9'
                            },
                            515:{
                                slidesPerView: '7'
                            },
                            450:{
                                slidesPerView: '6'
                            },
                            425:{
                                slidesPerView: '5'
                            },
                            375:{
                                slidesPerView: '4.5',
                            },
                        }}
                        modules={[Navigation]}
                        className="storyList"
                    >
                        {slideContents.map((slide, index) => (
                            <SwiperSlide key={index}>
                                <div className="listBox">
                                    <div className="listThumbnailBox">
                                        <div className="thumbnail_img">
                                            <img src={slide.imageURL} alt={`${slide.title} 프로필 이미지`} className='thumbnail' />
                                        </div>
                                    </div>
                                    <p className="listTitle">{slide.title}</p>
                                </div>
                            </SwiperSlide>
                        ))}

                        <div className="swiper-button-next"></div>
                        <div className="swiper-button-prev"></div>
                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default ContentTopWrap