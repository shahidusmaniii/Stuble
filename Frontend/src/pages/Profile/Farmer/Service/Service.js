import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../../../../styles/Service.css';
import AppContext from '../../../../context/AppContext';
const Service = () => {
    const { showAlert } = useContext(AppContext);
    const navigate = useNavigate()

    const [service, setService] = useState({
        email: "", mobileno: "", acre: "", ptype: "", date1: "", du1: "", du2: "", type: [], mtype: ""
    })

    useEffect(() => {
        console.log(service);
    }, [service]);
    const Servicefun = async (e) => {
        e.preventDefault();

        const data1 = document.getElementsByName("radio1");
        let datatype = null;
        for (let i = 0; i < data1.length; i++) {
            if (data1[i].checked) {
                datatype = data1[i].value;
                console.log(data1[i].value);
            }
        }
        const newValue = document.getElementsByClassName('myCheckBox');
        let arr = [];
        for (let i = 0; i < newValue.length; i++) {
            if (newValue[i].checked) {
                // arr = [...arr,newValue[i].value];
                arr = [...arr, newValue[i].value];
                console.log(newValue[i].value);
            }
        }
        setService({ email: service.email, mobileno: service.mobileno, acre: service.acre, ptype: service.ptype, date1: service.date1, du1: service.du1, du2: service.du2, type: datatype, mtype: JSON.stringify(arr) });
        const server = process.env.REACT_APP_SERVER;
        const data = await axios.post(`${server}/Service`, {
            email: service.email,
            mobileno: service.mobileno,
            acre: service.acre,
            ptype: service.ptype,
            date1: service.date1,
            du1: service.du1,
            du2: service.du2,
            type: service.type,
            mtype: service.mtype,

        })
        if (data.data.success) {
            showAlert(data.data.msg, 'success');
            navigate('/FarmerHome')
        } else {
            showAlert(data.data.msg, 'danger');
        }

    }


    let name, value;
    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;
        setService({ ...service, [name]: value })
        e.preventDefault();
    }


    return (
        <>
            <div id='JB' className="center1">
                <h1>Service Form
                </h1>
                <form onSubmit={Servicefun} method="POST" id="myForm">
                    <div className="txt_field">
                        <input type="text" required name='email' value={service.email} onChange={handleInput} />

                        <label>Email</label>
                    </div>
                    <div className="txt_field">
                        <input type="text" required name='mobileno' value={service.mobileno} onChange={handleInput} />

                        <label>Phone no.</label>
                    </div>
                    <div className="txt_field">
                        <input type="text" name="acre" required value={service.acre} onChange={handleInput} />
                        <span></span>
                        <label>How much land you have?<small>(in acers*)</small></label>
                    </div>
                    <div className="txt_field">
                        <input type="text" name="ptype" required value={service.ptype} onChange={handleInput} />
                        <span></span>
                        <label>Which crops are planted in your field?</label>
                    </div>
                    <span></span>
                    <div className="txt_field">

                        <input type="date" id="Date12" name="date1" value={service.date1} onChange={handleInput} />
                        <label for="date12">When did you plant that crop?</label>
                    </div>
                    <div >

                        <div className="txt_field">
                            <input type="date" id="Du1" name="du1" value={service.du1} onChange={handleInput} />
                            <label for="Du1">Approx duration of harvesting.</label>
                        </div>

                        <div className="txt_field">
                            <input type="date" id="Du2" name="du2" value={service.du2} onChange={handleInput} />
                            <label for="Du2">To</label>
                        </div>  </div>

                    <div className='jb' >

                        <label>What do you want to give ? </label>
                        <span></span>
                    </div>

                    <div className="radio-inputs jb1">
                        <label className="radio">
                            <input type="radio" name="radio1" value="Only Residue" />
                            <div className="name" onClick={() => setService({ ...service, mtype: "Only Residue" })}>Only Residue</div>

                        </label>
                        <label className="radio">
                            <input type="radio" name="radio1" value="Both Residue & Grains" />
                            <div className="name" onClick={() => setService({ ...service, mtype: "Both Residue & Grains" })}>Both Residue & Grains</div>
                        </label>
                    </div>


                    <div className='jb' >

                        <label for="faq">Select Machine you need for harvesting</label>
                        <span></span>
                    </div>
                    <div >
                        <div className="jb2">
                            <label class="conta">
                                <input type="checkbox" value="Harvester" className='myCheckBox' />
                                <div class="checkmark" onClick={() => setService({ ...service, type: "Harvester" })}></div>
                            </label>
                            <label className='jb3'>Harvester</label>
                        </div>
                        <div className="jb2">
                            <label class="conta">
                                <input type="checkbox" value="Tractor" className='myCheckBox' />
                                <div class="checkmark" onClick={() => setService({ ...service, type: "Tractor" })}></div>
                            </label>
                            <label className='jb3'>Tractor</label>
                        </div>
                        <div className="jb2">
                            <label class="conta">
                                <input type="checkbox" value="Soil cultivator" className='myCheckBox' />
                                <div class="checkmark" onClick={() => setService({ ...service, type: "Soil cultivator" })}></div>
                            </label>
                            <label className='jb3'>Soil cultivator</label>
                        </div>
                        <div className="jb2">
                            <label class="conta">
                                <input type="checkbox" value="Disc Plough" className='myCheckBox' />
                                <div class="checkmark" onClick={() => setService({ ...service, type: "Disc Plough" })}></div>
                            </label>
                            <label className='jb3'>Disc Plough</label>
                        </div>
                        <div className="jb2">
                            <label class="conta">
                                <input type="checkbox" value="Thresher " className='myCheckBox' />
                                <div class="checkmark" onClick={() => setService({ ...service, type: "Thresher" })}></div>
                            </label>
                            <label className='jb3'>Thresher</label>
                        </div>
                    </div>
                    <div className="cen">
                        <input type="submit" value="Request" />
                    </div>
                </form>
            </div>
            <div className="space"></div>
        </>
    )
}

export default Service

