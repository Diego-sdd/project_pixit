import React, { useState } from "react";
import { RegisterUserEmployee } from "../../../api/userEmployee";
import styles from "./styles.module.css";
import { phone as MaskPhone } from "../../../services/masksPhone";
import Button from "../../../component/button";
import Input from "../../../component/input";
const Register = (props: any) => {
  const { setRegisterUser } = props;
  const [name, setName] = useState<string>("");
  const [erroName, setErroName] = useState<string>("");
  const [office, setOffice] = useState<string>("");
  const [erroOffice, setErroOffice] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [erroPhone, setErroPhone] = useState<string>("");
  const [erroInput, setErroInput] = useState<boolean>(false);

  const handlerInsertUsers = async () => {
    let checkValidation = 0;
    if (phone.length < 15) {
      setErroPhone("Preencha seu número corretamente");
      checkValidation += 1;
    } else {
      setErroPhone("");
    }
    if (name === "") {
      setErroName("Preencha com seu nome");
      checkValidation += 1;
    } else {
      setErroName("");
    }
    if (office === "") {
      setErroOffice("Preencha o cargo");
      checkValidation += 1;
    } else {
      setErroOffice("");
    }
    if (checkValidation > 0) {
      setErroInput(true);
      return;
    }
    const phoneReplace = phone.replace(/\(|\)| |-/g, "");
    const data = {
      name,
      office,
      phone: phoneReplace,
    };
    try {
      const result = await RegisterUserEmployee(data);

      if (result.status === 200) {
        setRegisterUser(false);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      <h4>Cadastre o funcionário</h4>
      <div >
        <Input
          type="text"
          title="Nome"
          placeholder="Digite o nome"
          erroMessage={erroName}
          erro={erroInput}
          onChange={(el) => {
            setName(el.target.value);
          }}
        />

        <Input
          type="text"
          title="Telefone"
          max={16}
          placeholder="(00) 00000-0000"
          value={phone}
          erroMessage={erroPhone}
          erro={erroInput}
          onChange={(el) => {
            setPhone(MaskPhone(el));
          }}
        />

        <Input
          type="text"
          title="Cargo"
          erroMessage={erroOffice}
          erro={erroInput}
          placeholder="Atendente, Gerente, Estagiário ..."
          onChange={(el) => {
            setOffice(el.target.value);
          }}
        />
      </div>
      <br></br>
      <Button
        title={"Cadastrar"}
        onClick={() => {
          handlerInsertUsers();
        }}
      />
      <br></br>
      <Button
        title={"Voltar"}
        style={{
          background: "#30373B",
        }}
        onClick={() => {
          setRegisterUser(false);
        }}
      />
    </div>
  );
};

export default Register;
