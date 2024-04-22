import React, { useState } from 'react';

interface FormRangeProps {
    label: string;
    name: string;
    size?: string;
    price?: number;
}

const FormRange: React.FC<FormRangeProps> = ({ label, name, size = '', price }) => {
    const step = 10;
    const maxPrice = 2000;
    const [selectedPrice, setSelectedPrice] = useState(price || maxPrice);

    return (
        <div className='form-control'>
            <label htmlFor={name} className='label cursor-pointer'>
                <span className='label-text capitalize'>{label}</span>
                <span>${ selectedPrice }</span>
            </label>
            <input
                type='range'
                name={name}
                min={0}
                max={maxPrice}
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(Number(e.target.value))}
                className={`range range-primary ${size}`}
                step={step}
            />
            <div className='w-full flex justify-between text-xs px-2 mt-2'>
                <span className='font-bold text-md'>$0</span>
                <span className='font-bold text-md'>Max : ${maxPrice}</span>
            </div>
        </div>
    );
};

export default FormRange;
