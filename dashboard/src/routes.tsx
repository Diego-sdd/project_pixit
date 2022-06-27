import React from "react";
import {
  BrowserRouter,
  Route as PublicRoute,
  Navigate,
  Routes,
} from "react-router-dom";
import { safeAccess } from './services/misc';
import { connect } from 'react-redux';

//#Home page
import HomePage from "./pages/home";

//#region Authentication
import LoginIn from "./pages/login/index";
//#endregion

const RoutesPages = (props: any) => {
  const { token } = props;

  type ProtectedRouteProps = {
    element: JSX.Element;
  };

  function PrivateRoute({ element }: ProtectedRouteProps) {
    if (token) {
      return element;
    } else {
      return <Navigate to={{ pathname: "/" }} />;
    }
  }
  return (
    <BrowserRouter>
      <Routes>
        <PublicRoute path="/" element={<LoginIn />} />

        <PublicRoute
          path="/homePage"
          element={<PrivateRoute element={<HomePage />} />}
        />
        <PublicRoute element={<h1>Página não econtrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

const mapStateToProps = (state: any) => {
	return {
		token: safeAccess(state, ['authReducer', 'token'], undefined),
	};
};

export default connect(mapStateToProps)(RoutesPages);
