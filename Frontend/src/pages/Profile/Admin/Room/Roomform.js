import React, { useState, useContext } from 'react';
import axios from 'axios';
import '../../../../styles/RoomForm.css';
import { useNavigate } from 'react-router-dom'
import AppContext from '../../../../context/AppContext'
const Roomform = () => {
    const { showAlert } = useContext(AppContext);
    const navigate = useNavigate()
    const [Room, setRoom] = useState({
        Name: "", description: "", Code: "", StartBid: "", startDate: "", endDate: ""
    })
    const handleSubmit = async (event) => {
        event.preventDefault();
        const server = process.env.REACT_APP_SERVER;
        const data = await axios.post(`${server}/CreateRoom`, {
            Name: Room.Name,
            description: Room.description,
            Code: Room.Code,
            StartBid: Room.StartBid,
            startDate: Room.startDate,
            endDate: Room.endDate,
        })
        if (data.data.success) {
            showAlert(data.data.msg, 'success');
            navigate('/AdminHome')
        } else {
            showAlert(data.data.msg, 'danger');
        }
    };
    let name, value;
    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;
        setRoom({ ...Room, [name]: value })
        e.preventDefault();
    }

    return (
        <div className='centerR'>
            <h1>Create a new auction room</h1>
            <form onSubmit={handleSubmit} method="post">
                <div className="txt_field">
                    <input type="text" name='Name' value={Room.Name} onChange={handleInput} />
                    <label>
                        Name:
                    </label>
                </div>
                <div className="txt_field">
                    <input type="text" name='description' value={Room.description} onChange={handleInput} />
                    <label>
                        Description:
                    </label>
                </div>
                <div className="txt_field">
                    <input type="text" name='Code' value={Room.Code} onChange={handleInput} />
                    <label>
                        Unique Code:
                    </label>
                </div>
                <div className="txt_field">
                    <input type="Number" name='StartBid' value={Room.StartBid} onChange={handleInput} />
                    <label>
                        Starting Bid:
                    </label>
                </div>
                <div className="txt_field">
                    <input type="datetime-local" name='startDate' value={Room.startDate} onChange={handleInput} />
                    <label>
                        Start Date:
                    </label>
                </div>
                <div className="txt_field">
                    <input type="datetime-local" name='endDate' value={Room.endDate} onChange={handleInput} />
                    <label>
                        End Date:
                    </label>
                </div>

                <div className="GG">
                    <button type="submit" className="Login">Create Room</button>
                </div>


            </form>
        </div>
    );
}

export default Roomform;
