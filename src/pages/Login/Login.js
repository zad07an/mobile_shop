import React from 'react'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { loginSchema } from '../../Schemas/Validation'
import './Login.css'

export default function Login() {

  const navigate = useNavigate();
  // const user = useLocation((state) => state.user)

  const onSubmit = async (values, actions) => {
    try {

      await new Promise((resolve, reject) => setTimeout(resolve, 1000));
      actions.resetForm()

      navigate('/')
    } catch (err) {
      console.log(err);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      checkbox: false
    },
    validationSchema: loginSchema,
    onSubmit
  })

  return (
    <section className='login_container'>
      <div className="login_title">
        <Link to=''>MobiShop</Link>
      </div>
      <form action="" className="login_form" onSubmit={formik.handleSubmit}>
        <div className="login_form_title">
          <h2>Log In</h2>
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
          <button onClick={onSubmit} disabled={formik.isSubmitting}>Մուտք</button>
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
