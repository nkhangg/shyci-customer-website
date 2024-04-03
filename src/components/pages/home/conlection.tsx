import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';

export interface ICollectionHomeProps {
    data: { image: string; title: string };
}

export default function CollectionHome({ data }: ICollectionHomeProps) {
    const styleImage = process.env.NEXT_PUBLIC_STYLE_IMAGE_COLLECTION as 'cover' | 'contain';

    return (
        <div className="w-full h-conlection-home relative overflow-hidden max-w-full">
            <figure className="w-full h-full inset-0 relative max-w-full overflow-hidden">
                <Image
                    // style={{ objectFit: (process.env.NEXT_PUBLIC_STYLE_IMAGE_COLLECTION as 'cover' | 'contain') || 'cover' }}
                    className={classNames('inset-0 object-cover ', {
                        ['md:object-contain']: styleImage === 'contain',
                        ['md:object-cover']: styleImage === 'cover',
                    })}
                    src={data.image}
                    fill
                    alt={data.image}
                />
            </figure>
            <div className="absolute w-full flex items-center justify-center bottom-10 text-primary-light py-5 text-[1rem] font-medium">
                <span>{data.title}</span>
            </div>
        </div>
    );
}
