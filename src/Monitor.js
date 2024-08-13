import React, { useContext, useEffect } from 'react';
import { ConfigContext } from './ConfigContext';
import './Monitor.css';

const Monitor = () => {
    const { value1, value2, value3, setValue1, setValue2, setValue3 } = useContext(ConfigContext);

    useEffect(() => {
        // ดึงข้อมูลจาก localStorage เมื่อ component ถูก mount
        const storedValue1 = localStorage.getItem('value1');
        const storedValue2 = localStorage.getItem('value2');
        const storedValue3 = localStorage.getItem('value3');

        if (storedValue1) setValue1(storedValue1);
        if (storedValue2) setValue2(storedValue2);
        if (storedValue3) setValue3(storedValue3);

        // ฟังก์ชัน handleStorageChange สำหรับการฟังการเปลี่ยนแปลงใน localStorage
        const handleStorageChange = (event) => {
            if (event.key === 'value1') setValue1(event.newValue);
            if (event.key === 'value2') setValue2(event.newValue);
            if (event.key === 'value3') setValue3(event.newValue);
        };

        // ฟัง event 'storage' เพื่อจัดการการเปลี่ยนแปลงใน localStorage
        window.addEventListener('storage', handleStorageChange);

        // Cleanup เมื่อ component ถูก unmount
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [setValue1, setValue2, setValue3]);

    // ฟังก์ชันสำหรับจัดรูปแบบราคา
    const formatPrice = (value) => {
        const number = parseFloat(value);
        if (isNaN(number)) return value;
        return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(number);
    };

    return (
        <div className="container-monitor">
            <div className='row'>
                <div className='sl-header col-4'>
                    <h1 className='text-center'>หมายเลขประมูล</h1>
                    <h1 className='text-center'>{value1}</h1>
                </div>
                <div className='model-header col-8'>
                    <h1 className='price-txt text-center'>{value2}</h1>
                </div>
            </div>
            <div className='row'>
                <div className='text-center'>
                    <h3>ราคาปัจจุบัน</h3>
                </div>
            </div>
            <div className='price-action'>
                <h1 className='text-center'>{formatPrice(value3)}</h1>
            </div>
        </div>
    );
};

export default Monitor;
