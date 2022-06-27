import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { useState } from "react";

import { LoginUser } from "../../api/user";

import { setUserDataToken } from "../../redux/actions/authActions";
import { setUserData } from "../../redux/actions/dataUserActions";

import { safeAccess } from "../../services/misc";
import { validateEmail } from "../../services/validationEmail";

import Loading from "../../component/Loading";
import Button from "../../component/button";
import Input from "../../component/input";

import RegisterUser from "./register";
import styles from "./styles.module.css";

const Login = (porps: any) => {
  const navigate = useNavigate();
  const { setUserData, setUserDataToken } = porps;

  const [email, setEmail] = useState<string>("");
  const [emailErro, setEmailErro] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordErro, setPasswordErro] = useState<string>("");
  const [erroInput, setErroInput] = useState<boolean>(false);
  const [registerUser, setRegisterUser] = useState<boolean>(false);
  const [erroDataLogin, setErroDataLogin] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handlerLogin = async () => {
    setLoading(true);
    let checkValidation = 0;
    if (!validateEmail(email)) {
      setEmailErro("Digite seu email corretamente.");
      checkValidation += 1;
    } else {
      setEmailErro("");
    }
    if (password.length < 5) {
      setPasswordErro("Digite sua senha corretamente.");
      checkValidation += 1;
    } else {
      setPasswordErro("");
    }
    if (checkValidation > 0) {
      setErroInput(true);
      setLoading(false);
      return;
    } else {
      setErroInput(false);
    }
    try {
      const data = {
        email,
        password,
      };
      const result: any = await LoginUser(data);

      if (result.status === 200) {
        const token = safeAccess(result?.data, ["body", "token"], undefined);
        const dataUser = safeAccess(result?.data, ["body", "data"], undefined);

        setUserData(dataUser);
        setUserDataToken(token);
        setLoading(false);
        navigate("/homePage");
        return
      }
      if (result.status === 404) {
        setErroDataLogin("Email e/ou senha inválidos");
        setErroInput(true);
        setLoading(false);
        return
      }

      setErroDataLogin("Erro, tente novamente mais tarde");
      setErroInput(true);
      setLoading(false);
      return
    } catch (error) {
      setErroDataLogin("Erro, tente novamente mais tarde");
      setErroInput(true);
      setLoading(false);
      console.log(error);
    }
    return;
  };

  const handlerRegister = async () => {
    setRegisterUser(true);
    return;
  };
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.boxContentInput}>
          {!registerUser ? (
            <>
              <h4>Acesse a sua conta</h4>
              <br></br>
              <Input
                type="email"
                placeholder="Digite o email"
                title="Email"
                erroMessage={emailErro}
                erro={erroInput}
                onChange={(element: any) => {
                  setEmail(element.target.value);
                }}
              />
              <Input
                type="password"
                title="Senha"
                placeholder="Digite a senha"
                erroMessage={passwordErro}
                erro={erroInput}
                onChange={(element: any) => {
                  setPassword(element.target.value);
                }}
              />
              {erroInput && erroDataLogin !== "" && (
                <p
                  style={{
                    color: "red",
                    fontSize: 13,
                    marginTop: -10,
                    marginBottom: 10,
                  }}
                >
                  {erroDataLogin}
                </p>
              )}
              <div className={styles.forgetfulness}>
                <p>Esqueci minha senha</p>
              </div>

              <Button
                title={"Acessar"}
                onClick={() => {
                  handlerLogin();
                }}
              />
              <div className={styles.spacing} />
              <Button
                title={"Não tenho conta"}
                style={{
                  background: "#30373B",
                }}
                onClick={() => {
                  handlerRegister();
                }}
              />
            </>
          ) : (
            <RegisterUser setRegisterUser={setRegisterUser} />
          )}
        </div>
        <div className={styles.boxDescription}>
          <div>
            <p>Seja bem-vindo, efetue seu login ou cadastre uma nova conta</p>
          </div>
          <div className={styles.boxDescriptionImage} />
        </div>
      </div>
      <Loading loading={loading} />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setUserData: (value: any) => dispatch(setUserData(value)),
    setUserDataToken: (value: any) => dispatch(setUserDataToken(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
