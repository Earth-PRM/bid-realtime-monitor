import React, { useContext, useEffect } from 'react';
import { ConfigContext } from './ConfigContext';
import './Monitor.css';

const Monitor = () => {
    const { auctionno, auctionmodel, auctionprice, setAuctionNo, setAuctionModel, setAuctionPrice } = useContext(ConfigContext);

    useEffect(() => {
        // ดึงข้อมูลจาก localStorage เมื่อ component ถูก mount
        const storedAuctionNo = localStorage.getItem('auctionno');
        const storedAuctionModel = localStorage.getItem('auctionmodel');
        const storedAuctionPrice = localStorage.getItem('auctionprice');

        if (storedAuctionNo) setAuctionNo(storedAuctionNo);
        if (storedAuctionModel) setAuctionModel(storedAuctionModel);
        if (storedAuctionPrice) setAuctionPrice(storedAuctionPrice);

        // ฟังก์ชัน handleStorageChange สำหรับการฟังการเปลี่ยนแปลงใน localStorage
        const handleStorageChange = (event) => {
            if (event.key === 'auctionno') setAuctionNo(event.newValue);
            if (event.key === 'auctionmodel') setAuctionModel(event.newValue);
            if (event.key === 'auctionprice') setAuctionPrice(event.newValue);
        };

        // ฟัง event 'storage' เพื่อจัดการการเปลี่ยนแปลงใน localStorage
        window.addEventListener('storage', handleStorageChange);

        // Cleanup เมื่อ component ถูก unmount
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [setAuctionNo, setAuctionModel, setAuctionPrice]);

    // ฟังก์ชันสำหรับจัดรูปแบบราคา
    const formatPrice = (value) => {
        const number = parseFloat(value);
        if (isNaN(number)) return value;
        return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(number);
    };

    return (
        <div className="container-monitor bg-black text-white">
            <div className='row'>
                <div className='sl-header col-4'>
                    <h1 className='text-center text-[50px]'>หมายเลขประมูล</h1>
                    <h1 className='text-center text-[60px]'>{auctionno}</h1>
                </div>
                <div className='model-header col-8'>
                    <h1 className='price-txt text-center text-[100px]'>{auctionmodel}</h1>
                </div>
            </div>
            <div className='row'>
                <div className='text-center'>
                    <h3 className='text-[100px]'>ราคาปัจจุบัน</h3>
                </div>
            </div>
            <div className='price-action !border-none'>
                <h1 className='text-center text-[300px]'>{formatPrice(auctionprice)}</h1>
            </div>
        </div>
    );
};

export default Monitor;
