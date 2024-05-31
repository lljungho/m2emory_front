import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import { useSelector } from 'react-redux';

const StoryWrap = () => {
    const user = useSelector(store => store.userInfo);

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
        <>
            <div className='contentTopBox'>
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
                                1440:{
                                    slidesPerView: '6.5'
                                },
                                900:{
                                    slidesPerView: '5.5'
                                },
                                769:{
                                    slidesPerView: '4.5'
                                },
                                520:{
                                    slidesPerView: '5.5'
                                },
                                375:{
                                    slidesPerView: '4.5',
                                },
                            }}
                            modules={[Navigation]}
                            className="storyList"
                        >
                            <SwiperSlide>
                                <div className="listBox onfirmed cursorPointer">
                                    <div className="listThumbnailBox">
                                        <div className="thumbnail_img">
                                            <img src={user.u_pf_img} alt={`${user.u_id} 프로필 이미지`} className='thumbnail' />
                                        </div>
                                    </div>
                                    <p className="listTitle me">My Story</p>
                                </div>
                            </SwiperSlide>

                            {slideContents.map((slide, index) => (
                                <SwiperSlide key={index}>
                                    <div className="listBox cursorPointer">
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
        </>
    )
}

export default StoryWrap