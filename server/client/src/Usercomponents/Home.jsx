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
            <Header_home position="fixed"/>
            <Helmet>
                <title>India's Cheapest SMM Service - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly</title>
                <meta name="description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly"></meta>
                <meta name="keywords" content="smm,social media marketing, likes, followers, subscribers, view, increase followers, increase likes, increase subscribers, increase youtube subscribers, cheap instagram followers, trusted cheap best price facebook ads, youtube ads, youtube watchtime hours, cheap youtube watchtime hours, cheapest in market, facebook likes, facebook followers, twitter likes, comments, india's cheapest smm service at best price in market, 
                इन्सग्राम फॉलोअर्स बढ़ाएं, insagraam pholoars badhaen, 
                इन्सग्राम लाइक बढ़ाएं, insagraam laik badhaen  "/>

                <meta property="og:smmdigg" content="" /> 
                <meta property="og:www.smmdigg.in" content="" /> 
                <meta property="og:Addfund" content=""/> 
                <meta property="og:description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place, Instantly" />
                <meta property="og:img" content="" /> 
                <meta property="og:url" content="" /> 
                <meta property="og:type" content="article" />
            </Helmet>
            <div class="container">
                <div className="style">
                    
                </div>
                <div className="style2">
                    
                </div>
               <div className="home_body1 d-flex">
                    <div className=" textbox d-flex flex-column  m-auto img-fluid  ">
                        <span className="display-2 mt-5 head_home text-white">Get Your Social <span className="">Account's Followers</span> and Likes</span>
                        <span className="w-100 caption">From Unexpected Friendships, to Lasting Relationships. Our website is a Cheap SMM and SEO service Reseller Auto Panel Script. Fast, Reliable and Secure, offering World Best Quality and Cheapest Automatic Social Media Services which is specially developed for Resellers with High Speed order completion!.</span>
                        {/* <span className="text-dark caption">Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly</span> */}
                        {/* <Button onClick={navigate} className="w-25 btnn font-weight-bold mr-auto" variant="contained" color="warning">GET STARTED <i class="fas ml-1 fa-arrow-right"></i></Button> */}
                    </div>
                    <div className="img_box ">
                        {/* <img src={img2} alt="image"  className="mt-5 hm_img img-fluid"/> */}
                        <div>
                                            <Paper elevation={6} className="   widthforlogin m-auto ">
                                {loading ? <LinearProgress/> :""}
                                <div className='login_div1 container m-auto'>

                                
                                {/* <div className="m-auto container login_div1  bg-light"> */}
                                
                                    <ToastContainer/>
                                    <div className='d-flex'>
                                        <img src={user} className='m-auto' alt="user_logo" height="100px" />
                                    </div>
                                    <div className="title">
                                        <h3 className='mt-2 text-center'>Login</h3>
                                    </div>
                                    <div className="controls">
                                    <form action="">
                                            <div  className="my-3 d-flex flex-row form-outline">
                                                {/* <i className="fa icons fa-envelope mr-2"></i> */}
                                                <img className='mr-2' src={emaill} height="30px" width="30px" alt="email_icon" />
                                                <TextField disabled={disable} autoComplete='none' error={emilerr} helperText={emilerr ? "Email is Required" : ""}  id="email" type="text" label="Your Email" name="email" variant="outlined" size='small' value={email} onChange={handleEmailChange} type="email"  fullWidth/>
                                                
                                                    {/* <TextField type="text" className="form-control my-auto" placeholder="Username" aria-label="Username" aria-describedby="basic-addon" size='small'/> */}
                                                    </div>
                                                
                                        
                                            <div  className="my-3 d-flex flex-row ">
                                                {/* <i className="fas icons mr-2 fa-key"></i> */}
                                                <img className='mr-2' src={pass1} height="30px" width="30px" alt="password_icon" />
                                                <TextField disabled={disable} autoComplete='none'  error={passerr} helperText={passerr ? "Password is Required" : ""}  size="small" type="password" label="Your Password" id="passwd" name="password" variant="outlined" value={password} onChange={handlePassChange}   fullWidth/>
                                            </div>
                                            <div className='d-flex flex-row justify-content-between'>
                            
                                                <div className='d-flex flex-row'>
                                                    <Checkbox onClick={showHidePassed} disabled={disable}/><p className='mt-auto mb-auto' >Show Password</p>
                                                </div>
                                            </div>
                                            <div>
                                                <Button disabled={disable} variant="contained" color="success" to="#" fullWidth onClick={login}  className="btn btn-success mt-2">Secure Login <img className='mx-1' src={padlock} height="20px" alt="" /> </Button>
                                            </div>
                                    </form>
                                    <div className="mt-3">
                                            <p><Link className="text-primary h6" to="/v1.1/forgot-password">Forgot password?</Link></p>
                                    </div>
                                        <div className="mt-3">
                                            <p>New to smmdigg?<Link className="text-primary h6" to="/signup"> Create Account</Link></p>
                                        </div>
                                    </div>
                                </div>
                                </Paper>
                        </div>
                    </div>
                    
               </div>
               {/* //section2 */}
               {/* <hr /> */}
               <div className="row mt-5">
                   <div className="left_hm col-sm">
                       <div className="d-flex flex-row mb-4">
                            <div>
                                <i class="fas fa-5x fa-atom mr-4 text-white"></i>
                            </div>
                            <div className="d-flex">
                                <h4 className="font-weight-bold mt-auto mb-auto text-white">Affordable prices and fast delivery guaranteed!</h4>
                            </div>
                        </div>
                       <div>
                       <p className='text-white'>Save time managing your social account in one panel. Where people buy SMM services such as Facebook ads management, instagram, YouTube,Twitter, Soundcloud, website ads and many more!</p>
                           <p className='text-white'>It is a panel that provides the oldest and most reliable automated social media services. smmDigg is a fully automatic system and has a structure where you can get followers, likes, views and more without sharing your password.</p>
                       </div>
                       <div>
                           <p className="my-3 registerNowBtn"  onClick={Register}>Register for free</p>
                           {/* <button onClick={addServiceBulkk}>Add Service</button> */}
                       </div>
                   </div>
                   <div className="right_hm col-sm">
                        <img src={hm} alt="image" height="400px" width="400px" className="img-fluid" />
                   </div>
               </div>
               {/* section 3 */}
               <div className="row my-5">
                   <div className="right_hm col-sm">
                        <img src={girl} alt="image" height="500px" width="500px" className="img-fluid" />
                   </div>
                   <div className="left_hm col-sm  d-flex align-items-center mt-3">
                       <div>
                            <h3 className="font-weight-bold text-white">Why smmDigg?</h3>
                           <div className="my-2 bg-success rounded shadow-lg d-flex">
                                <i class="far fa-2x text-white mt-auto mb-auto pl-3 fa-gem"></i>
                               <h6 className="py-3 text-white px-5">Quality service</h6>
                           </div>
                           <div className="my-2 bg-success rounded shadow-lg d-flex">
                                <i class="fas fa-2x text-white mt-auto mb-auto pl-3 fa-robot"></i>
                               <h6 className="py-3 text-white px-5">Instant automatic submission</h6>
                           </div>
                           <div className="my-2 bg-success rounded shadow-lg d-flex">
                                <i class="fas fa-2x text-white mt-auto mb-auto pl-3 fa-ticket-alt"></i>
                               <h6 className="py-3 text-white px-5">CRM Ticket system</h6>
                           </div>
                           <div className="my-2 bg-success rounded shadow-lg d-flex">
                           <i class="far fa-thumbs-up fa-2x text-white mt-auto mb-auto pl-3"></i>
                               <h6 className="py-3 text-white px-5">Multiple payment options</h6>
                           </div>
                           <div className="my-2 bg-success rounded shadow-lg d-flex">
                           <i class="fas fa-2x text-white mt-auto mb-auto pl-3 fa-headset"></i>
                               <h6 className="py-3 text-white px-5">24/7 Online support</h6>
                           </div>
                       </div>
                   </div>
               </div>
               <Home_Footer/>
            </div>
        </div>
    )
}

export default Home
