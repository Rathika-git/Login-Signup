import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Validation from './SignupValidation';
import axios from 'axios'

function Signup(){
  const [values, setValues] = useState({
   name:'',
    email:'',
    password:''
  })
  const navigate = useNavigate(); 
  const [errors,setErrors] = useState({})
  const handleInput= (event) => {
    setValues(prev=>({...prev,[event.target.name]: [event.target.value]}))
  }
const handleSubmit=(event)=>{
  event.preventDefault();
  const err=Validation(values);
  setErrors(err);
  if(err.name === "" && err.email === "" && err.password === ""){
    axios.post('http://localhost:5000/signup',values)
    .then(res => {
      navigate('/');
    })
    .catch(err => console.log(err));
  }
}

  return(
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'
    style={{
        backgroundImage: 'url("./black.avif")', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
    <div className='bg-white p-3 rounded w-25'>
    <div className="text-center mb-4">
          <h2>Sign-Up</h2>
        </div>
      <form action="" onSubmit={handleSubmit}>
      <div className='mb-3'>
          <label htmlFor="name"><strong>Name</strong></label>
          <input type="text" placeholder='Enter Name' name='name'
          onChange={handleInput} className='form-control rounded-0'/>
        {errors.name && <span className='text-danger'> {errors.name}</span>}
        </div>
        <div className='mb-3'>
          <label htmlFor="email"><strong>Email</strong></label>
          <input type="email" placeholder='Enter Email' name='email'
          onChange={handleInput} className='form-control rounded-0'/>
        {errors.email && <span className='text-danger'> {errors.email}</span>}
        </div>
        <div className='mb-3'>
          <label htmlFor="password"><strong>Password</strong></label>
          <input type="password" placeholder='Enter Password'  name='password'
          onChange={handleInput} className='form-control rounded-0'/>
          {errors.password && <span className='text-danger'> {errors.password}</span>}
          </div>
          <button type='submit' className='btn btn-success w-50 rounded-0'style={{ backgroundColor: '#D4AF37' }}
          >Sign Up</button>
          <Link to="/" className='btn btn-default border w-50 bg-light rounded-0 text-decoration-none'>Login</Link>
        </form>
    </div>
  </div>
)
}

export default Signup;