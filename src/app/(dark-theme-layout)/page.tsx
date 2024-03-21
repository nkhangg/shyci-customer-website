import { Conlection } from '@/components';
import Image from 'next/image';

export default function Home() {
    const data = [
        {
            image: 'https://lostmanagementcities.com/img/main/SS24-6-PC.jpg',
            title: 'SS24 6TH release',
        },
        {
            image: 'https://lostmanagementcities.com/img/main/SS24-WP-PC2.jpg',
            title: "SS24 Women's PAck 1st release",
        },
        {
            image: 'https://lostmanagementcities.com/img/main/SS24-VLT-PC.jpg',
            title: 'SS24 Valentine pack release',
        },
        {
            image: 'https://lostmanagementcities.com/img/main/FW23_AVRX_PC.jpg',
            title: 'LMC. x AVIREX RELEASE',
        },
    ];

    return (
        <main className="py-header">
            {data.map((item) => {
                return <Conlection key={item.image} data={item} />;
            })}
        </main>
    );
}
