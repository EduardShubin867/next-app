'use server'
import { TMarker } from '@/types/TMarker'

export async function getMarkers() {
    const markers: TMarker[] = [
        {
            id: '66235586ba57c6d72560d855',
            name: 'dawd',
            icon: 'location_on_black_24dp',
            description: 'Some Description',
            position: [2.5, 7.2],
            img: [
                '/assets/images/Default_A_towering_medieval_castle_stands_majestically_atop_a_0.jpg',
            ],
            images: [
                '/assets/images/Default_A_towering_medieval_castle_stands_majestically_atop_a_0.jpg',
            ],
            color: 'black',
            location: 'Some Location',
        },
    ]

    return markers
}
