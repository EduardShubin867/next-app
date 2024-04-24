'use client'

import { useState, useEffect, useRef, SyntheticEvent } from 'react'
import L, { LatLngExpression } from 'leaflet'
import uuid from 'react-uuid'

import { TMarker } from '@/types/TMarker'

import NewMarker from './NewMarker/NewMarker'
import MarkerIcon from './MarkerIcon/MarkerIcon'
import MarkerColorOptions from './MarkerColorOptions/MarkerColorOptions'

type Props = {
    mapEdit: boolean
    handleSwitchChange: () => void
    location: string
}

type Image = {
    name: string
}

const Controls = ({ mapEdit, handleSwitchChange, location }: Props) => {
    const containerRef = useRef(null)

    useEffect(() => {
        if (containerRef.current) {
            L.DomEvent.disableClickPropagation(containerRef.current)
            L.DomEvent.disableScrollPropagation(containerRef.current)
        }
    }, [])

    const [newPosition, setNewPosition] = useState<LatLngExpression>([0, 0])
    const [newMarkerName, setNewMarkerName] = useState('')
    const [newMarkerDescription, setNewMarkerDescription] = useState('')
    const [newMarkerImage, setNewMarkerImage] = useState<Array<any>>([])
    const [newMarkerIcon, setNewMarkerIcon] = useState<string>(
        'location_on_black_24dp'
    )
    const [validated, setValidated] = useState(false)
    const [error, setError] = useState('')
    const [imageError, setImageError] = useState(true)
    const [color, setColor] = useState<string>('black')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    //Add marker handle function
    const handleAddMarker = async (event: SyntheticEvent) => {
        event.preventDefault()
        setValidated(true)

        if (!newPosition) {
            return
        }

        if (imageError) {
            return
        }

        const newMarker: TMarker = {
            id: uuid(),
            name: newMarkerName,
            icon: newMarkerIcon,
            description: newMarkerDescription,
            img: newMarkerImage
                ? newMarkerImage.map((img) => `/assets/images/${img.name}`)
                : [],
            images: newMarkerImage || [],
            position: newPosition,
            color: color,
            location: location,
        }

        try {
            setAddRequestStatus('pending')

            setNewMarkerName('')
            setNewMarkerDescription('')
            setNewMarkerImage([])
            setNewMarkerIcon('location_on_black_24dp')
            setNewPosition([0, 0])
            setValidated(false)
            setError('')
        } catch (error) {
            console.error('Failed to save marker: ', error)
        } finally {
            setAddRequestStatus('idle')
        }
    }

    useEffect(() => {
        if (!newPosition) {
            setError('Пожалуйста, установите маркер')
        } else {
            setError('')
        }
    }, [newPosition])

    useEffect(() => {
        if (!(newMarkerImage && !(newMarkerImage.length === 0))) {
            setImageError(true)
        } else {
            setImageError(false)
        }
    }, [newMarkerImage])

    return (
        <div>
            {mapEdit ? (
                <NewMarker
                    newPosition={newPosition}
                    setNewPosition={setNewPosition}
                    newMarkerIcon={newMarkerIcon}
                    newMarkerName={newMarkerName}
                    newMarkerDescription={newMarkerDescription}
                    newMarkerImg={newMarkerImage}
                    color={color}
                />
            ) : null}
            <div className="leaflet-top leaflet-right" ref={containerRef}>
                <div className="leaflet-control leaflet-bar control-switch">
                    <div className="absolute top-2 right-2">
                        <input
                            type="checkbox"
                            id="adminSwitch"
                            className="toggle toggle-primary"
                            checked={mapEdit}
                            onChange={handleSwitchChange}
                        />
                    </div>
                    {mapEdit ? (
                        <div className="relative mt-2">
                            <button className="btn btn-secondary mt-2 control-btn">
                                Добавить маркер
                            </button>
                            <div className="popover popover-bottom">
                                <div className="popover-header">
                                    Добавить маркер
                                </div>
                                <div className="popover-body p-4 overflow-auto max-h-[800px] w-[350px]">
                                    <div className="marker-control">
                                        <form
                                            noValidate
                                            onSubmit={handleAddMarker}
                                            className="space-y-3"
                                        >
                                            <div>
                                                <label htmlFor="newMarkerName">
                                                    Иконка маркера
                                                </label>
                                                <div className="flex justify-center mb-1">
                                                    <MarkerIcon
                                                        setNewMarkerIcon={
                                                            setNewMarkerIcon
                                                        }
                                                        newMarkerIcon={
                                                            newMarkerIcon
                                                        }
                                                        color={color}
                                                    />
                                                </div>
                                                <MarkerColorOptions
                                                    color={color}
                                                    setColor={setColor}
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="newMarkerName">
                                                    Название маркера
                                                </label>
                                                <input
                                                    id="newMarkerName"
                                                    type="text"
                                                    className="input input-bordered w-full"
                                                    value={newMarkerName}
                                                    onChange={(e) =>
                                                        setNewMarkerName(
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="newMarkerDescription">
                                                    Описание
                                                </label>
                                                <textarea
                                                    id="newMarkerDescription"
                                                    className="textarea textarea-bordered w-full"
                                                    rows={3}
                                                    value={newMarkerDescription}
                                                    onChange={(e) =>
                                                        setNewMarkerDescription(
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="newMarkerImage">
                                                    Загрузить картинку
                                                </label>

                                                {imageError && (
                                                    <div className="alert alert-error mt-2">
                                                        Пожалуйста, загрузите
                                                        изображение.
                                                    </div>
                                                )}
                                            </div>
                                            {error && (
                                                <div className="alert alert-error">
                                                    {error}
                                                </div>
                                            )}
                                            <button
                                                type="submit"
                                                className="btn btn-primary mb-3"
                                                disabled={
                                                    addRequestStatus ===
                                                    'pending'
                                                }
                                            >
                                                Добавить маркер
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default Controls
