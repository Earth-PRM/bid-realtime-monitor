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
        if (!newAuctionNo || !newAuctionModel || !newAuctionPrice || !newAuctionPerTime) {
            alert("กรุณากรอกข้อมูลให้ครบทุกช่องก่อนเพิ่มแถว");
            return;
        }

        if (isNaN(newAuctionPrice) || isNaN(newAuctionPerTime)) {
            alert("กรุณากรอกตัวเลขในช่อง 'ราคา' และ 'ประมูล' เท่านั้น");
            return;
        }

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
        const row = tableData.find(row => row.id === id);

        const updatedAuctionNo = prompt("Enter new value for หมายเลขประมูล:", row.auctionno);
        if (!updatedAuctionNo) {
            alert("หมายเลขประมูลห้ามเว้นว่าง");
            return;
        }

        const updatedAuctionModel = prompt("Enter new value for รุ่นประมูล:", row.auctionmodel);
        if (!updatedAuctionModel) {
            alert("รุ่นประมูลห้ามเว้นว่าง");
            return;
        }

        let updatedAuctionPrice = prompt("Enter new value for ราคา:", row.auctionprice);
        if (!updatedAuctionPrice || isNaN(updatedAuctionPrice)) {
            alert("กรุณากรอกตัวเลขในช่อง 'ราคา' เท่านั้น");
            return;
        }

        let updatedAuctionPerTime = prompt("Enter new value for ประมูล:", row.auctionpertime);
        if (!updatedAuctionPerTime || isNaN(updatedAuctionPerTime)) {
            alert("กรุณากรอกตัวเลขในช่อง 'ประมูล' เท่านั้น");
            return;
        }

        updatedAuctionPrice = Number(updatedAuctionPrice);
        updatedAuctionPerTime = Number(updatedAuctionPerTime);

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

    // Function to delete a row
    const deleteRow = (id) => {
        const confirmDelete = window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบแถวนี้?");
        if (confirmDelete) {
            const updatedTableData = tableData.filter(row => row.id !== id);
            setTableData(updatedTableData);
        }
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
                    <button onClick={handleUpdate} className='bg-green-500 hover:bg-green-700'>อัปเดต (ราคา)</button>
                    <button onClick={bidUpdate}>ประมูล</button>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <h3 className='text-2xl'>ข้อมูลที่ป้อนล่วงหน้า</h3>
                    <div className="table-container h-[73vh]">
                        <table>
                            <thead>
                                <tr>
                                    <th>หมายเลขประมูล</th>
                                    <th>รุ่นประมูล</th>
                                    <th>ราคา</th>
                                    <th>ประมูล</th>
                                    <th>เลือก</th>
                                    <th>แก้ไข</th>
                                    <th>ลบ</th> {/* Added Delete column */}
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
                                            <button onClick={() => changeRow(row.id)} className='bg-yellow-500 hover:bg-yellow-700'>แก้ไข</button>
                                        </td>
                                        <td>
                                            <button onClick={() => deleteRow(row.id)} className='bg-red-500 hover:bg-red-700'>ลบ</button> {/* Added Delete button */}
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
