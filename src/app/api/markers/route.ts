import type { NextApiRequest, NextApiResponse } from 'next'
import mongodb from '@/lib/mongodb'
import MarkersModel from '@/models/MarkersModel'
import { NextResponse } from 'next/server'

export async function GET(request: NextApiRequest) {
    // const { method } = request

    // await mongodb()

    // const data = await MarkersModel.find({})

    return NextResponse.json(
        [
            {
                _id: {
                    $oid: '66235586ba57c6d72560d855',
                },
                name: 'dawd',
                icon: 'location_on_black_24dp',
                description: 'awdawdawddddd',
                position: [3.0389419675423035, 10.623779296875002],
                img: [
                    '/assets/images/Default_A_towering_medieval_castle_stands_majestically_atop_a_0.jpg',
                ],
                color: 'black',
            },
        ],
        { status: 200 }
    )
}
