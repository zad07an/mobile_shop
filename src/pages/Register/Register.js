import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { registerSchema } from "../../Schemas/Validation";
import { tabTitle } from '../../PageTabTitle/pageTabTitle';
import {BiErrorCircle} from 'react-icons/bi';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../store/UserSlice';
import './Register.css'

function Register() {

  tabTitle('Գրանցում - MobiShop')
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isValid = useRef(false);
  const {users} = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      fname: '',
      lname: '',
      email: '',
      age: '',
      password: '',
      confirmPassword: '',
      acceptedTerms: false
    },
    validationSchema: registerSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const userExist = users.find((user) => user.email === values.email && user.email === values.email ? isValid.current = true : isValid.current = false);
        if (!userExist) {
          await axios.post('http://localhost:5000/users', values)
          console.log('Successful');
          resetForm()
          navigate('/login')
        } else {
          console.log('User already exist');
        }
      } catch (err) {
        console.log(err);
      }
    }
  })

  const emailExistStyle = isValid.current ? {border: '1px solid crimson'} : null

  return (
    <section className='register_container'>
      <form action="" className='register_form' onSubmit={formik.handleSubmit}>
        <div className="register_form_title">
          <h2>Register <span>MobiShop</span></h2>
        </div>
        <div className="register_fname_lname">
          <div className="fname_input">
            <label htmlFor="fname">Name</label>
            <input type="text" name='fname' id='fname' placeholder='Լրացրեք ձեր անունը'
              value={formik.values.fname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} />
            {formik.errors.fname && formik.touched.fname ? <span className='error_message'>{formik.errors.fname}</span> : null}
          </div>
          <div className="lname_input">
            <label htmlFor="lname">Surname</label>
            <input type="text" name='lname' id='lname' placeholder='Լրացրեք ձեր ազգանունը' value={formik.values.lname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} />
            {formik.errors.lname && formik.touched.lname ? <span className='error_message'>{formik.errors.lname}</span> : null}
          </div>
        </div>
        <div className="register_email_age">
          <div className="email_input">
            <label htmlFor="email">Email</label>
            <div style={emailExistStyle}>
              <input type="email" name='email' id='email' placeholder='Լրացրեք ձեր էլ․ հասցեն' value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} 
              />
              {
                isValid.current ?
                <BiErrorCircle size={22} color='crimson'/> : null
              }
            </div>
            {formik.errors.email && formik.touched.email ? <span className='error_message'>{formik.errors.email}</span> : null}
          </div>
          <div className="age_input">
            <label htmlFor="age">Age</label>
            <input type="text" name='age' id='age' placeholder='Լրացրեք ձեր տարիքը' value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} />
            {formik.errors.age && formik.touched.age ? <span className='error_message'>{formik.errors.age}</span> : null}
          </div>
        </div>
        <div className="password_input">
          <div className="password">
            <label htmlFor="pwd">Password</label>
            <input type="password" name='password' id='pwd' placeholder='Լրացրեք ձեր գաղտնաբառը' value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} />
            {formik.errors.password && formik.touched.password ? <span className='error_message'>{formik.errors.password}</span> : null}
          </div>
          <div className="confirm_password">
            <label htmlFor="cnf_pwd">Confirm Password</label>
            <input type="password" name='confirmPassword' id='cnf_pwd' placeholder='Հաստատեք ձեր գաղտնաբառը' value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} />
            {formik.errors.confirmPassword && formik.touched.confirmPassword ? <span className='error_message'>{formik.errors.confirmPassword}</span> : null}
          </div>
        </div>
        <div className="checkbox_input">
          <div>
            <input type="checkbox" name='acceptedTerms' id='checkbox' onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.checkbox} />
            <label htmlFor="checkbox">Accept the Terms of service</label>
          </div>
          {formik.errors.acceptedTerms && formik.touched.acceptedTerms ? <span className='error_message'>{formik.errors.acceptedTerms}</span> : null}
        </div>
        <div className="submit_input">
          <button type='submit' onClick={formik.handleSubmit} disabled={formik.isSubmitting}>Գրանցվել</button>
          <span style={{color: 'red'}}>{isValid.current ? 'Email already exist' : null}</span>
        </div>
        <div className="have_account">
          <Link to='/login'>Ունեմ ակաունտ</Link>
        </div>
      </form>
    </section>
  )
}

export default Register;