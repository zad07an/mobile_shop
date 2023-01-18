import React from 'react';
import './Register.css'
import {Link, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import {registerSchema} from "../../Schemas/Validation";

function Register() {

  const navigate = useNavigate();
  // const user = useLocation((state) => state.user)

  const onSubmit = async (values, actions) => {
    try {

      await new Promise((resolve, reject) => setTimeout(resolve, 1000));
      actions.resetForm()

      navigate('/login')
    } catch (err) {
      console.log(err);
    }
  }

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
    onSubmit
  })

  return (
    <section className='register_container'>
      <div className="register_title">
        <Link to=''>MobiShop</Link>
      </div>
      <form action="" className='register_form' onSubmit={formik.handleSubmit}>
        <div className="register_form_title">
          <h2>Register</h2>
        </div>
        <div className="register_fname_lname">
          <div className="fname_input">
            <label htmlFor="fname">Name</label>
            <input type="text" name='fname' id='fname' placeholder='Լրացրեք ձեր անունը'
             value={formik.values.fname}
             onChange={formik.handleChange}
             onBlur={formik.handleBlur}/>
            {formik.errors.fname && formik.touched.fname ? <span className='error_message'>{formik.errors.fname}</span> : null}
          </div>
          <div className="lname_input">
            <label htmlFor="lname">Surname</label>
            <input type="text" name='lname' id='lname' placeholder='Լրացրեք ձեր ազգանունը' value={formik.values.lname}
                   onChange={formik.handleChange}
                   onBlur={formik.handleBlur}/>
            {formik.errors.lname && formik.touched.lname ? <span className='error_message'>{formik.errors.lname}</span> : null}
          </div>
        </div>
        <div className="register_email_age">
          <div className="email_input">
            <label htmlFor="email">Email</label>
            <input type="email" name='email' id='email' placeholder='Լրացրեք ձեր էլ․ հասցեն' value={formik.values.email}
                   onChange={formik.handleChange}
                   onBlur={formik.handleBlur}/>
            {formik.errors.email && formik.touched.email ? <span className='error_message'>{formik.errors.email}</span> : null}
          </div>
          <div className="age_input">
            <label htmlFor="age">Age</label>
            <input type="text" name='age' id='age' placeholder='Լրացրեք ձեր տարիքը' value={formik.values.age}
                   onChange={formik.handleChange}
                   onBlur={formik.handleBlur}/>
            {formik.errors.age && formik.touched.age ? <span className='error_message'>{formik.errors.age}</span> : null}
          </div>
        </div>
        <div className="password_input">
          <div className="password">
            <label htmlFor="pwd">Password</label>
            <input type="password" name='password' id='pwd' placeholder='Լրացրեք ձեր գաղտնաբառը' value={formik.values.password}
                   onChange={formik.handleChange}
                   onBlur={formik.handleBlur}/>
            {formik.errors.password && formik.touched.password ? <span className='error_message'>{formik.errors.password}</span> : null}
          </div>
          <div className="confirm_password">
            <label htmlFor="cnf_pwd">Confirm Password</label>
            <input type="password" name='confirmPassword' id='cnf_pwd' placeholder='Հաստատեք ձեր գաղտնաբառը' value={formik.values.confirmPassword}
                   onChange={formik.handleChange}
                   onBlur={formik.handleBlur}/>
            {formik.errors.confirmPassword && formik.touched.confirmPassword ? <span className='error_message'>{formik.errors.confirmPassword}</span> : null}
          </div>
        </div>
        <div className="checkbox_input">
          <div>
            <input type="checkbox" name='acceptedTerms' id='checkbox' onChange={formik.handleChange}
                   onBlur={formik.handleBlur}
                   checked={formik.values.checkbox}/>
            <label htmlFor="checkbox">Accept the Terms of service</label>
          </div>
          {formik.errors.acceptedTerms && formik.touched.acceptedTerms ? <span className='error_message'>{formik.errors.acceptedTerms}</span> : null}
        </div>
        <div className="submit_input">
          <button onClick={onSubmit} disabled={formik.isSubmitting}>Գրանցվել</button>
        </div>
      </form>
    </section>
  )
}

export default Register;