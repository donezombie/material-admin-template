import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { PersonPin } from '@material-ui/icons';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  wrapper: {
    backgroundImage: 'radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%)',
    // backgroundImage: 'linear-gradient(to top, #6200ea, #1976d2) !important;',
    fontFamily: 'Roboto, sans-serif',
    boxSizing: 'border-box',
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textShadow: '.2px 4px 6px #ccccc',
  },
  form: {
    background: 'white',
    width: '80%',
    maxWidth: 400,
    height: '100vh',
    maxHeight: 400,
    boxShadow: '1px 2px 5px #ccc',
    borderRadius: 6,
    padding: 20,
    '& > #logo': {
      padding: '20px 0',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
    },
    '& > #logo svg': {
      fontSize: '4.5em',
    },
    '& > #logo > h3': {
      fontSize: 20,
      margin: 0,
      userSelect: 'none',
    },
    '& > div ': {
      margin: 18,
    },
    '& > div': {
      position: 'relative',
    },
    '& > div > div': {
      color: 'red',
      fontSize: 10,
      fontWeight: 300,
      marginTop: 5,
      marginLeft: 0,
    },
    '& > div > label': {
      pointerEvents: 'none',
      position: 'absolute',
      fontWeight: 300,
      fontSize: 14,
      top: 10,
      left: 2,
      transition: 'all .3s',
    },
    '& > div > input': {
      border: 'none',
      borderBottom: '1px solid #cccccc',
      outline: 'none',
      padding: '8px 0',
      fontSize: 14,
      width: '100%',
    },
    '& > div > input:focus + label': {
      top: -6,
      left: 0,
      fontSize: 10,
      color: 'dodgerblue',
    },
    '& > div > input:valid + label': {
      top: -6,
      left: 0,
      fontSize: 10,
      color: 'dodgerblue',
    },
    '& > div > input:focus': {
      borderBottom: '1px solid dodgerblue',
    },
    '& > button': {
      width: '100%',
      padding: 12,
      borderRadius: 30,
      marginTop: 24,
      fontSize: 16,
      color: 'white',
      backgroundColor: '#4facfe',
      transition: '.2s all',
      outline: 'none',
    },
    '& > button:hover': {
      cursor: 'pointer',
      boxShadow: '.2px 4px 6px #cccccc',
    },
    '& > button:active': {
      boxShadow: '.2px 4px 6px rgba(0, 0, 0, 0.6)',
    },
    '& > p': {
      fontSize: 16,
      fontWeight: 300,
      marginTop: 14,
      textAlign: 'center',
    },
    '& a': {
      paddingLeft: 7,
      textDecoration: 'none',
    },
  },
  error: {
    borderBottom: '1px solid red !important',
  },
  show: {
    visibility: 'visible !important',
  },
  errorsBar: {
    minHeight: 12,
    visibility: 'hidden',
  },
});

const SignUpForm = (props) => {
  const {
    handleBlur,
    values,
    handleChange,
    errors,
    handleSubmit,
    touched,
    classes,
    userReducer,
  } = props;
  const { loading, err } = userReducer;

  return (
    <div className={classes.wrapper}>
      <form className={classes.form}>
        <div id="logo">
          <PersonPin />
          <h3>Đăng nhập</h3>
        </div>
        <div id="username">
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            name="username"
            type="text"
            className={classNames({
              [classes.error]: errors.username && touched.username,
            })}
            required
          />
          <label>Username</label>
          <div
            className={classNames(classes.errorsBar, {
              [classes.show]: touched.username && errors.username,
            })}
          >
            {errors.username}
          </div>
        </div>
        <div id="password">
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            type="password"
            name="password"
            className={classNames({
              [classes.error]: errors.password && touched.password,
            })}
            required
          />
          <label>Password</label>
          <div
            className={classNames(classes.errorsBar, {
              [classes.show]: touched.password && errors.password,
            })}
          >
            {errors.password}
          </div>
        </div>
        <p style={{ marginBottom: 0, color: 'red' }}>{err ? 'Có lỗi xảy ra vui lòng nhập lại!' : ''}</p>
        <button disabled={loading} type="submit" onClick={handleSubmit}>
          {loading ? 'Loading...' : 'Đăng nhập'}
        </button>
      </form>
    </div>
  );
};

const validationSchema = Yup.object().shape({
  // Validate form field
  username: Yup.string()
    .required('Username is required')
    .min(4, 'Username must have min 4 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(4, 'Password must have min 4 characters'),
});

const SignUpFormFormik = withFormik({
  mapPropsToValues() {
    return {
      username: '',
      password: '',
    };
  },
  validationSchema,
  handleSubmit: (values, { props }) => {
    const { userLogin } = props;
    const { username, password } = values;
    userLogin(username, password);
  },
})(SignUpForm);

export default withStyles(styles)(SignUpFormFormik);
