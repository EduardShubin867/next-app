import React, { Dispatch, SetStateAction } from 'react'
import uuid from 'react-uuid'

interface Props {
    color: string
    setColor: Dispatch<SetStateAction<string>>
}

const MarkerColorOptions = ({ color, setColor }: Props) => {
    const colorOptions = ['black', 'white', 'blue', 'yellow', 'skyblue']

    const handleSelectedStyle = (newColor: string) => {
        return newColor === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''
    }

    return (
        <div className="flex justify-center flex-wrap">
            {colorOptions.map((optionColor) => {
                return (
                    <div
                        key={uuid()}
                        className={`w-12 h-12 m-2 rounded-full bg-${optionColor}-500 cursor-pointer ${handleSelectedStyle(
                            optionColor
                        )}`}
                        style={{ backgroundColor: optionColor }}
                        onClick={() => setColor(optionColor)}
                    />
                )
            })}
        </div>
    )
}

export default MarkerColorOptions
