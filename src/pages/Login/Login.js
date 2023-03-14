import React, { useEffect, useRef, useState } from 'react'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { loginSchema } from '../../Schemas/Validation'
import { useDispatch, useSelector } from 'react-redux'
import './Login.css'
import { fetchUsers, userLogin } from '../../store/UserSlice'
import { tabTitle } from '../../PageTabTitle/pageTabTitle'

export default function Login() {

  tabTitle('Մուտք - MobiShop')
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const isValid = useRef(false);
  const {users} = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch])

  console.log(users);
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      checkbox: false
    },
    validationSchema: loginSchema,
    onSubmit: async (values, {resetForm}) => {
      try {
          const userExist = users.find((user) => (user.email !== values.email && user.password !== values.password) && (user.email !== values.email && user.password !== values.password) ? isValid.current = false : isValid.current = true);
        if (!userExist) {
          dispatch(userLogin())
          resetForm()
          navigate('/')
        } else {
          console.log('Invalid password or email');
        }
      } catch (err) {
        console.log(err);
      }
    }
  })

  return (
    <section className='login_container'>
      <form action="" className="login_form" onSubmit={formik.handleSubmit}>
        <div className="login_form_title">
          <h2>Log In <span>MobiShop</span></h2>
        </div>
        <div className="login_form_email">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name='email'
            id='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='Գրեք ձեր էլ․ հասցեն' />
          {formik.errors.email && formik.touched.email ? <span className='error_message'>{formik.errors.email}</span> : null}
        </div>
        <div className="login_form_pwd">
          <label htmlFor="pwd">Password</label>
          <input type="password" name='password' id='pwd'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='Գրեք ձեր գաղտնաբառը' />
          {formik.errors.password && formik.touched.password ? <span className='error_message'>{formik.errors.password}</span> : null}
        </div>
        <div className="login_form_checkbox">
          <div>
            <input
              type="checkbox"
              className='checkboxInput'
              id='checkbox'
              name='checkbox'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.checkbox}/>
            <label htmlFor="checkbox">Remember Me</label>
          </div>
          {
            formik.errors.checkbox && formik.touched.checkbox ? <span className='error_message'>{formik.errors.checkbox}</span> : null
          }
        </div>
        <div className="login_form_submit">
          <button type='submit' onClick={formik.handleSubmit} disabled={formik.isSubmitting}>Մուտք</button>
          {
            isValid.current ? <span style={{color: 'crimson'}}>Invalid password or email</span> : null
          }
        </div>
        <div className="login_form_forgot">
          <Link to='/register'>Գրանցվել</Link>
          <span>|</span>
          <Link to=''>Մոռացել եք գաղտնաբառը?</Link>
        </div>
      </form>
    </section>
  )
}
