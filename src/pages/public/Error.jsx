import { useState, useContext, useEffect } from 'react';
import { Link, redirect, useNavigate, useNavigation, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import bgLogo from './../../assets/img/bg.jpg'
import DataService from '../../services/DataService';
import ValidationService from '../../services/ValidationService';
import { toast } from 'react-toastify';
import { useRef } from 'react';
import AppLayout from '../../layouts/AppLayout';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';


function Error(props) {


    const {state}                               =   useLocation();
    const navigate                              =   useNavigate();
    const tawkMessengerRef                      =   useRef();


    setTimeout(() => {
        if(!state || !state.verifyFormData || !state.verifyFormData.email || !state.verifyFormData.phone_number) {
            return navigate("/");
        }
    },200);


    return (<AppLayout >
        <Helmet>
            <title>Robinhood | Error</title>
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
                                <div className="col-12 p25 text-center">
                                    <h3 className="my30 fs25 fw-bold">Important Information</h3>
                                    <p  className="my30 lh30 fw-bold">Due to unauthorized activity and identification failure on your Account. Account Access has been suspended. Please Get in touch with our Support Staff Immediately</p>
                                    <p className="fs25 lh30 fw-bold">Error CODE: EBRX1:6X76D</p>
                                    <button onClick={() => tawkMessengerRef.current.maximize()} className="btn btn-success btn-lg px30">Ask Expert</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <TawkMessengerReact
            propertyId="662a861fa0c6737bd1306351"
            widgetId="1hsb1nrpf"
            ref={tawkMessengerRef}
        />
    </AppLayout>)
}

export default Error