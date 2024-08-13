import React, { useContext, useState } from 'react';
import { ConfigContext } from './ConfigContext';
import './Config.css';

const Config = () => {
    const { setValue1, setValue2, setValue3, setValue4 } = useContext(ConfigContext);
    const [newValue1, setNewValue1] = useState('');
    const [newValue2, setNewValue2] = useState('');
    const [newValue3, setNewValue3] = useState('');
    const [newValue4, setNewValue4] = useState('');
    const [tableData, setTableData] = useState([]);

    const handleUpdate = () => {
        setValue1(newValue1);
        setValue2(newValue2);
        setValue3(newValue3);
        setValue4(newValue4);

        localStorage.setItem('value1', newValue1);
        localStorage.setItem('value2', newValue2);
        localStorage.setItem('value3', newValue3);
        localStorage.setItem('value4', newValue4);

        console.log('อัปเดตค่าดังนี้:', newValue1, newValue2, newValue3, newValue4);
    };

    const bidUpdate = () => {
        let sum = Number(newValue3) + Number(newValue4);

        setNewValue3(sum);
        setValue3(sum);

        localStorage.setItem('value3', sum);

        console.log('อัปเดต bid:', sum);
    };

    const addRow = () => {
        setTableData([
            ...tableData,
            { id: Date.now(), value1: newValue1, value2: newValue2, value3: newValue3, value4: newValue4 }
        ]);

        setNewValue1('');
        setNewValue2('');
        setNewValue3('');
        setNewValue4('');
    };

    const selectRow = (row) => {
        setNewValue1(row.value1);
        setNewValue2(row.value2);
        setNewValue3(row.value3);
        setNewValue4(row.value4);
    };

    const changeRow = (id) => {
        const updatedValue1 = prompt("Enter new value for หมายเลขประมูล:", tableData.find(row => row.id === id).value1);
        const updatedValue2 = prompt("Enter new value for รุ่นประมูล:", tableData.find(row => row.id === id).value2);
        const updatedValue3 = prompt("Enter new value for ราคา:", tableData.find(row => row.id === id).value3);
        const updatedValue4 = prompt("Enter new value for ประมูล:", tableData.find(row => row.id === id).value4);

        const updatedTableData = tableData.map((row) =>
            row.id === id
                ? {
                    ...row,
                    value1: updatedValue1,
                    value2: updatedValue2,
                    value3: updatedValue3,
                    value4: updatedValue4
                }
                : row
        );
        setTableData(updatedTableData);
    };

    return (
        <div className="">
            <div className='addQuestion'>
                <div className='row'>
                    <h1>Config</h1>
                </div>
                <div className='row'>
                    <div className='col-4'>
                        <input
                            type="text"
                            value={newValue1}
                            onChange={(e) => setNewValue1(e.target.value)}
                            placeholder="หมายเลขประมูล"
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-4'>
                        <input
                            type="text"
                            value={newValue2}
                            onChange={(e) => setNewValue2(e.target.value)}
                            placeholder="รุ่นประมูล"
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-3'>
                        <input
                            type="text"
                            value={newValue3}
                            onChange={(e) => setNewValue3(e.target.value)}
                            placeholder="ราคา"
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-3'>
                        <input
                            type="text"
                            value={newValue4}
                            onChange={(e) => setNewValue4(e.target.value)}
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
                    <h3>ข้อมูลที่ป้อนล่วงหน้า</h3>
                    <div className="table-container">
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
                                        <td>{row.value1}</td>
                                        <td>{row.value2}</td>
                                        <td>{row.value3}</td>
                                        <td>{row.value4}</td>
                                        <td>
                                            <button onClick={() => selectRow(row)}>เลือก</button>
                                        </td>
                                        <td>
                                            <button className='btn btn-primary' onClick={() => changeRow(row.id)}>แก้ไข</button>
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
