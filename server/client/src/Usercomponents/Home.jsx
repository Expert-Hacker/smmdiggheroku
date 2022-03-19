import {React,useState,useEffect} from 'react'
import Header_home from './Header_home'
import '../home.css'
import img from '../images/homePagepic.png'
import img2 from '../images/bg.png'
import hm from '../images/hm.png'
import girl from '../images/girl.png'
import { Link,useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import {TextField,Button} from '@mui/material'
import Home_Footer from './Home_footer'
import { Paper, Checkbox} from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress';
import Helmet from 'react-helmet'
import user from '../../src/images/user.png'
import emaill from '../../src/images/email.png'
import pass1 from '../../src/images/key.png'
import padlock from '../../src/images/padlock.png'
let validator = require("email-validator");

function Home() {
    const[disable,setDisable]=useState(false)
  const[loading,setLoading]=useState(false);
    const[emilerr,setemailerr]=useState(false)
    const[passerr,setpasserr]=useState(false)
    const history=useHistory()
  
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("")
    useEffect(() => {
       

        setEmail(getCookie("email"))
        setPassword(getCookie("password"))
    }, []);
 
    function navigate()
    {
        history.push('/v1.1/dashboard')
    }
    function Register()
    {
        history.push('/signup')
    }
    function getCookie(ema,pass) {
        // Split cookie string and get all individual name=value pairs in an array
        var cookieArr = document.cookie.split(";");
    
        // Loop through the array elements
        for(var i = 0; i < cookieArr.length; i++) {
            var cookiePair = cookieArr[i].split("=");
    
          
            if(ema == cookiePair[0].trim()) {
                // Decode the cookie value and return
                return decodeURIComponent(cookiePair[1]);
            }
            if(pass == cookiePair[1].trim()) {
                // Decode the cookie value and return
                return decodeURIComponent(cookiePair[1]);
            }
        }
    
        // Return null if not found
        return null;
    }
    
    // let name, value;
    function handleEmailChange(e)
    {
       
        setEmail(e.target.value)
    }
    function handlePassChange(e)
    {
        setPassword(e.target.value)
    }
  
    async function login(e)
   {
     
        localStorage.setItem('login_status',true)
        // let {email,password}=input;
        if(!email)
        {
            setemailerr(true)
        }
        if(!password)
        {
            setpasserr(true)
        }
        function validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        if(!validateEmail(email))
        {
            setemailerr(true)
        }
        if(validator.validate(email))
        {
                try {
                    setDisable(true)
                    setLoading(true)
                    let res= await fetch('/login',{
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify({
                            email,password
                        })
                    })
                    
                    let resp= await res.json();
              
                    if(res.status==200 && resp.role=="user")
                    {
                        // document.cookie="email="+email+";path=http://localhost:3000/login"
                        // document.cookie="password="+password+";path=http://localhost:3000/login"
                        document.cookie = "email" + "=" + encodeURIComponent(email);
                        document.cookie = "password" + "=" + encodeURIComponent(password);

                        setLoading(false)
                        toast.success('Login Successfull!', {
                            position: "bottom-center",
                            autoClose: 3500,
                            draggable: false,
                            }); 
                            setTimeout(function()
                            {
                            history.push("/v1.1/dashboard")
                            },4000)
                    }
                    if(res.status==200 && resp.role=="admin")
                    {

                        document.cookie = "email" + "=" + encodeURIComponent(email); 
                        document.cookie = "password" + "=" + encodeURIComponent(password);

                        setLoading(false)
                        toast.success('Login Successfull!', {
                            position: "bottom-center",
                            autoClose: 3500,
                            draggable: false,
                            }); 
                            setTimeout(function()
                            {
                            history.push("/v1.1/admin-dashboard")
                            },4000)
                    }
                    if(res.status==400)
                    {
                        setLoading(false)
                        setDisable(false)
                        toast.error('Invalid Credentials!', {
                            position: "bottom-center",
                            autoClose: 3500,
                            draggable: false,
                            }); 
                    }
                } catch (error) {
                    setLoading(false);
                    setDisable(false)
                    toast.error('Invalid Credentials!', {
                        position: "bottom-center",
                        autoClose: 3500,
                        draggable: false,
                        }); 
                    
                }
        }

   }
   function showHidePassed()
   {
        let val=document.getElementById('passwd');
        if(val.type=="password")
        {
            val.type="text"
        }
        else
        {
            val.type="password"
        }
   }
    return (
        <div className='home_bckgnd'>
            <Header_home position="relative"/>
            <div className="margin-top">
                <div className='grid container'>
                    <div className='caption bg-'>
                        <h1 className='caption1'><span>Get Your Social Account's Followers and Likes</span></h1>
                        <p className='caption-2'>From Unexpected Friendships, to Lasting Relationships. Our website is a Cheap SMM and SEO service Reseller Auto Panel Script. Fast, Reliable and Secure, offering World Best Quality and Cheapest Automatic Social Media Services which is specially developed for Resellers with High Speed order completion!.</p>
                    </div>
                    <div className='login-code img-fluid'>
                            <div className="login-heading">
                                <h1 className="login-name"><span>Login to SMMDIGG</span></h1>
                            </div>
                            <div className="login-form text-white">
                                <TextField className='my-3' color='warning' disabled={disable} autoComplete='none' error={emilerr} helperText={emilerr ? "Email is Required" : ""}  id="email" type="text" label="Your Email" name="email" variant="outlined" size='small' value={email} onChange={handleEmailChange} type="email"  fullWidth/>
                                <TextField className='my-3' disabled={disable} autoComplete='none'  error={passerr} helperText={passerr ? "Password is Required" : ""}  size="small" type="password" label="Your Password" id="passwd" name="password" variant="outlined" value={password} onChange={handlePassChange}   fullWidth/>
                            </div>
                            <div className='d-flex flex-row'>
                                <Checkbox onClick={showHidePassed} disabled={disable}/><p className='mt-auto mb-auto' >Show Password</p>
                            </div>
                            <ToastContainer/>
                            <div>
                                {loading ? <LinearProgress/> : ""}
                                <Button disabled={disable} variant="contained" color="success" to="#" fullWidth onClick={login}  className="btn btn-success mt-2">Secure Login <img className='mx-1' src={padlock} height="20px" alt="" /> </Button>
                            </div>
                    </div>
                </div>
            </div>
            <div className="section-2 my-3 container">
                   <div className="right_hm ">
                        <img src={girl} alt="image" height="500px" width="500px" className="img-fluid" />
                   </div>
                   <div className="left_hm  d-flex align-items-center mt-3">
                       <div>
                            <h3 className="font-weight-bold text-white">Why smmDigg?</h3>
                           <div className="my-2 panel-color rounded shadow-lg d-flex">
                                <i class="far fa-2x text-white mt-auto mb-auto pl-3 fa-gem"></i>
                               <h6 className="py-3 text-white px-5">Quality service</h6>
                           </div>
                           <div className="my-2 panel-color rounded shadow-lg d-flex">
                                <i class="fas fa-2x text-white mt-auto mb-auto pl-3 fa-robot"></i>
                               <h6 className="py-3 text-white px-5">Instant automatic submission</h6>
                           </div>
                           <div className="my-2 panel-color rounded shadow-lg d-flex">
                                <i class="fas fa-2x text-white mt-auto mb-auto pl-3 fa-ticket-alt"></i>
                               <h6 className="py-3 text-white px-5">CRM Ticket system</h6>
                           </div>
                           <div className="my-2 panel-color rounded shadow-lg d-flex">
                           <i class="far fa-thumbs-up fa-2x text-white mt-auto mb-auto pl-3"></i>
                               <h6 className="py-3 text-white px-5">Multiple payment options</h6>
                           </div>
                           <div className="my-2 panel-color rounded shadow-lg d-flex">
                           <i class="fas fa-2x text-white mt-auto mb-auto pl-3 fa-headset"></i>
                               <h6 className="py-3 text-white px-5">24/7 Online support</h6>
                           </div>
                       </div>
                   </div>
               </div>
               <Home_Footer/>
        </div>
    )
}

export default Home