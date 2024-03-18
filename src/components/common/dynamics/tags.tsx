import Link from 'next/link';
import React, { ReactNode } from 'react';

export type ValidTags = keyof JSX.IntrinsicElements;

export interface ITagsProps {
    href?: string;
    component?: ValidTags;
    children?: ReactNode;
    className?: string;
}

export default function Tags({ href, component = 'div', children, className }: ITagsProps) {
    let Tag: ValidTags | typeof Link = component;

    if (href && href !== '') {
        Tag = Link;
    }
    return (
        <Tag className={className} href={href || ''}>
            {children}
        </Tag>
    );
}
