'use client';
import React, { useMemo, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import classNames from 'classnames';
import { IImageProduct } from '../../../interface';

export interface IProductDetailSlideProps {
    data: IImageProduct[];
}

export default function ProductDetailSlide({ data }: IProductDetailSlideProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const [sliderRef, instanceRef] = useKeenSlider({
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
        created() {
            setIsLoading(true);
        },
        slides: {
            perView: 1,
        },
    });

    const renderImages = useMemo(
        () =>
            data.map((value, index) => (
                <div
                    style={{
                        maxHeight: 'calc(-65 + 100vh)',
                    }}
                    className="keen-slider__slide h-[500px] md:h-[700px]"
                    key={index}
                >
                    <figure className="w-full h-full">
                        <Image style={{ objectFit: 'cover' }} src={value.name} alt={value.name} fill />
                    </figure>
                </div>
            )),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    const renderDots = useMemo(
        () =>
            isLoading &&
            [...Array(instanceRef?.current?.track.details.slides.length || 0).fill(2)].map((_, index) => (
                <div
                    className={classNames('h-[5px] border border-black', {
                        [index == (currentSlide.toFixed(0) || 0) ? 'w-[40px] bg-black' : 'w-[30px]']: true,
                    })}
                    key={index}
                    onClick={() => instanceRef.current?.moveToIdx(index)}
                />
            )),
        [currentSlide, instanceRef, isLoading],
    );
    return (
        <div ref={sliderRef} className="relative keen-slider w-full h-full lg:hidden">
            {renderImages}

            <div className="absolute w-full bottom-5 flex items-center justify-center gap-4">{renderDots}</div>
        </div>
    );
}
