import LoginForm from "../forms/LoginForm";

const Login = () => {
  
  return (
    <div style={{background: 'rgb(2, 0, 36)',background: 'linear-gradient(90deg,rgba(2, 0, 36, 1) 0%,rgba(9, 9, 121, 1) 16%,rgba(0, 212, 255, 1) 100%)', minHeight: '100vh', display: 'flex'}}>
      <LoginForm />
    </div>
  );
};

export default Login;
