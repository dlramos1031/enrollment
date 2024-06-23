import { Helmet } from 'react-helmet';

const LoginPage = () => {
  return (
    <div>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <h1>Welcome to the Home Page</h1>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div>
      <Helmet>
        <title>About Us</title>
      </Helmet>
      <h1>About Us</h1>
    </div>
  );
};

export { LoginPage, AboutPage };
