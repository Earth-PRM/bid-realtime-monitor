import React, { useContext, useState } from 'react';
import { ConfigContext } from './ConfigContext';
import './Config.css';

const Config = () => {
    const { setAuctionNo, setAuctionModel, setAuctionPrice, setAuctionPerTime } = useContext(ConfigContext);
    const [newAuctionNo, setNewAuctionNo] = useState('');
    const [newAuctionModel, setNewAuctionModel] = useState('');
    const [newAuctionPrice, setNewAuctionPrice] = useState('');
    const [newAuctionPerTime, setNewAuctionPerTime] = useState('');
    const [tableData, setTableData] = useState([]);

    const handleUpdate = () => {
        setAuctionNo(newAuctionNo);
        setAuctionModel(newAuctionModel);
        setAuctionPrice(newAuctionPrice);
        setAuctionPerTime(newAuctionPerTime);

        localStorage.setItem('auctionno', newAuctionNo);
        localStorage.setItem('auctionmodel', newAuctionModel);
        localStorage.setItem('auctionprice', newAuctionPrice);
        localStorage.setItem('auctionpertime', newAuctionPerTime);

        console.log('อัปเดตค่าดังนี้:', newAuctionNo, newAuctionModel, newAuctionPrice, newAuctionPerTime);
    };

    const bidUpdate = () => {
        let sum = Number(newAuctionPrice) + Number(newAuctionPerTime);

        setNewAuctionPrice(sum);
        setAuctionPrice(sum);

        localStorage.setItem('auctionprice', sum);

        console.log('อัปเดต bid:', sum);
    };

    const addRow = () => {
        setTableData([
            ...tableData,
            { id: Date.now(), auctionno: newAuctionNo, auctionmodel: newAuctionModel, auctionprice: newAuctionPrice, auctionpertime: newAuctionPerTime }
        ]);

        setNewAuctionNo('');
        setNewAuctionModel('');
        setNewAuctionPrice('');
        setNewAuctionPerTime('');
    };

    const selectRow = (row) => {
        setNewAuctionNo(row.auctionno);
        setNewAuctionModel(row.auctionmodel);
        setNewAuctionPrice(row.auctionprice);
        setNewAuctionPerTime(row.auctionpertime);
    };

    const changeRow = (id) => {
        const updatedAuctionNo = prompt("Enter new value for หมายเลขประมูล:", tableData.find(row => row.id === id).auctionno);
        const updatedAuctionModel = prompt("Enter new value for รุ่นประมูล:", tableData.find(row => row.id === id).auctionmodel);
        const updatedAuctionPrice = prompt("Enter new value for ราคา:", tableData.find(row => row.id === id).auctionprice);
        const updatedAuctionPerTime = prompt("Enter new value for ประมูล:", tableData.find(row => row.id === id).auctionpertime);

        const updatedTableData = tableData.map((row) =>
            row.id === id
                ? {
                    ...row,
                    auctionno: updatedAuctionNo,
                    auctionmodel: updatedAuctionModel,
                    auctionprice: updatedAuctionPrice,
                    auctionpertime: updatedAuctionPerTime
                }
                : row
        );
        setTableData(updatedTableData);
    };

    return (
        <div className="">
            <div className='addQuestion'>
                <div className='row'>
                    <h1 className='font-bold text-2xl'>Config</h1>
                </div>
                <div className='row'>
                    <div className='col-4'>
                        <input
                            type="text"
                            value={newAuctionNo}
                            onChange={(e) => setNewAuctionNo(e.target.value)}
                            placeholder="หมายเลขประมูล"
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-4'>
                        <input
                            type="text"
                            value={newAuctionModel}
                            onChange={(e) => setNewAuctionModel(e.target.value)}
                            placeholder="รุ่นประมูล"
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-3'>
                        <input
                            type="text"
                            value={newAuctionPrice}
                            onChange={(e) => setNewAuctionPrice(e.target.value)}
                            placeholder="ราคา"
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-3'>
                        <input
                            type="text"
                            value={newAuctionPerTime}
                            onChange={(e) => setNewAuctionPerTime(e.target.value)}
                            placeholder="ประมูล"
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <button onClick={addRow}>เพิ่มแถว</button>
                    </div>
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-5'></div>
                <div className='col-3'>
                    <button onClick={handleUpdate}>อัปเดต (ราคา)</button>
                    <button onClick={bidUpdate}>ประมูล</button>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <h3 className='text-2xl'>ข้อมูลที่ป้อนล่วงหน้า</h3>
                    <div className="table-container h-full">
                        <table>
                            <thead>
                                <tr>
                                    <th>หมายเลขประมูล</th>
                                    <th>รุ่นประมูล</th>
                                    <th>ราคา</th>
                                    <th>ประมูล</th>
                                    <th>เลือก</th>
                                    <th>แก้ไข</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((row) => (
                                    <tr key={row.id}>
                                        <td>{row.auctionno}</td>
                                        <td>{row.auctionmodel}</td>
                                        <td>{row.auctionprice}</td>
                                        <td>{row.auctionpertime}</td>
                                        <td>
                                            <button onClick={() => selectRow(row)}>เลือก</button>
                                        </td>
                                        <td>
                                            <button onClick={() => changeRow(row.id)}>แก้ไข</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Config;
