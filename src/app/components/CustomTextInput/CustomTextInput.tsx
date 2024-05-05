'use client';
import { Label, TextInput as FlowbiteTextInput } from 'flowbite-react';

interface Props {
    label: string;
    value: string;
    id: string | undefined;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomTextInput = ({ label, value, id, onChange }: Props) => {
    return (
        <>
            <div className="mb-2 block">
                <Label htmlFor={id} value={label} />
            </div>

            <FlowbiteTextInput value={value} onChange={(e) => onChange(e)} id={id} type="text" sizing="md" />
        </>
    );
};

export default CustomTextInput;
