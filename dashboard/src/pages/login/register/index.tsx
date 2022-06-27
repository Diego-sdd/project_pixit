import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import { safeAccess } from "../../../services/misc";

import { RegisterUser } from "../../../api/user";

import { setUserDataToken } from "../../../redux/actions/authActions";
import { setUserData } from "../../../redux/actions/dataUserActions";

import Loading from "../../../component/Loading";
import Button from "../../../component/button";
import Input from "../../../component/input";

import styles from "./styles.module.css";

const Register = (porps: any) => {
  const navigate = useNavigate();
  const { setRegisterUser, setUserData, setUserDataToken } = porps;

  const [email, setEmail] = useState<String>("");
  const [erroEmail, setErroEmail] = useState<String>("");
  const [name, setName] = useState<String>("");
  const [erroName, setErroName] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [erroPassword, setErroPassword] = useState<String>("");
  const [confirmPassword, setConfirmPassword] = useState<String>("");
  const [erroConfirmPassword, setErroConfirmPassword] = useState<String>("");
  const [erroForm, setErroForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [erroDataLogin, setErroDataLogin] = useState<string>("");
  const handlerRegister = async () => {
    setLoading(true);
    let checkDate: number = 0;
    if (email.length < 8) {
      setErroEmail("Digite seu e-mail corretamente");
      checkDate += 1;
    } else {
      setErroEmail("");
    }
    if (name.length < 3) {
      setErroName("Digite seu nome corretamente");
      checkDate += 1;
    } else {
      setErroName("");
    }
    if (password.length < 5) {
      setErroPassword("Senha deve conter mais de 5 caracteres");
      checkDate += 1;
    } else {
      setErroPassword("");
    }
    if (confirmPassword !== password) {
      setErroConfirmPassword("A senha não condiz com a senha anterior");
      checkDate += 1;
    } else {
      setErroConfirmPassword("");
    }

    if (checkDate > 0) {
      setErroForm(true);
      setLoading(false);
      return;
    } else {
      setErroForm(false);
    }

    const dataUser = {
      email,
      password,
      name,
    };

    try {
      const resultUser: any = await RegisterUser(dataUser);
      setLoading(false);

      if (resultUser.status === 200) {
        const token = safeAccess(
          resultUser?.data,
          ["body", "token"],
          undefined
        );
        const dataUser = safeAccess(
          resultUser?.data,
          ["body", "data"],
          undefined
        );

        setUserData(dataUser);
        setUserDataToken(token);
        setErroDataLogin("");
        navigate("/homePage");
        return;
      }
      if (resultUser.status === 409) {
        setErroForm(true);
        setLoading(false);
        setErroDataLogin("");
        setErroEmail("Já existe um cadastro com esse e-mail");
        return;
      }
      setErroDataLogin("Erro, tente novamente mais tarde");
      setErroForm(true);
      setLoading(false);
      return;
    } catch (error) {
      setErroDataLogin("Erro, tente novamente mais tarde");
      setErroForm(true);
      setLoading(false);
      return;
    }
  };
  return (
    <div>
      <h4>Cadastre sua conta</h4>
      <br></br>
      <Input
        type="email"
        title="E-mail"
        placeholder="Digite seu email"
        erroMessage={erroEmail}
        erro={erroForm}
        onChange={(element: any) => {
          setEmail(element.target.value);
        }}
      />
      <Input
        type="email"
        title="Nome"
        placeholder="Digite seu nome"
        erroMessage={erroName}
        erro={erroForm}
        onChange={(element: any) => {
          setName(element.target.value);
        }}
      />
      <Input
        type="password"
        title="Senha"
        placeholder="Digite uma senha"
        erroMessage={erroPassword}
        erro={erroForm}
        onChange={(element: any) => {
          setPassword(element.target.value);
        }}
      />
      <Input
        type="password"
        title="Confirme sua senha"
        placeholder="Digite a senha"
        erroMessage={erroConfirmPassword}
        onChange={(element: any) => {
          setConfirmPassword(element.target.value);
        }}
      />
      <br></br>
      {erroForm && erroDataLogin !== "" && (
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
      <br></br>
      <Button
        title={"Cadastrar"}
        onClick={() => {
          handlerRegister();
        }}
      />
      <div className={styles.spacing} />
      <Button
        title={"Voltar"}
        style={{
          background: "#30373B",
        }}
        onClick={() => {
          setRegisterUser(false);
        }}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
