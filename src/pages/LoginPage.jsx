import { SignIn } from '@clerk/clerk-react';

const LoginPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <SignIn routing="path" path="/login" />
    </div>
  );
};

export default LoginPage;