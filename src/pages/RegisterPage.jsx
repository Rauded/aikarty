import { SignUp } from '@clerk/clerk-react';

const RegisterPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <SignUp routing="path" path="/register" />
    </div>
  );
};

export default RegisterPage;