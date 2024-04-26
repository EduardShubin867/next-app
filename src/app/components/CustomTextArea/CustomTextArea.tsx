import { Label, Textarea } from 'flowbite-react'

interface Props {
    label: string
    value: string
    id: string | undefined
    onChange: (arg0: string) => void
}

const CustomTextArea = ({ label, value, id, onChange }: Props) => {
    return (
        <>
            <div className="mb-2 block">
                <Label htmlFor={id} value={label} />
            </div>
            <Textarea
                id={id}
                placeholder="Введите описание..."
                required
                rows={4}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </>
    )
}

export default CustomTextArea
