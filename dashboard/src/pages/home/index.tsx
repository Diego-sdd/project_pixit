import { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { MdPersonAddAlt1, MdOutlineAddCircleOutline } from "react-icons/md";
import { connect } from "react-redux";

import { GetUserEmployee, DeteledUserEmployee } from "../../api/userEmployee";

import { safeAccess } from "../../services/misc";

import { reset as resetAuth } from "../../redux/actions/authActions";
import { reset as resetUser } from "../../redux/actions/dataUserActions";

import Table from "../../component/table";
import Modal from "../../component/modal";
import Loading from "../../component/Loading";
import Button from "../../component/button";

import RegisterUsers from "./registerEmployee";
import styles from "./styles.module.css";



const Home = (props: any) => {
  const { userData, setUserDataReset, setUserDataTokenReset } = props;

  const navigate = useNavigate();

  const [usersData, setUsersData] = useState<Array<Object>>([]);
  const [titleData, setTitleData] = useState<Array<String>>([]);
  const [actionIdDeleted, setActionIdDeleted] = useState<number>(0);
  const [open, setOpen] = useState<Boolean>(false);
  const [registerUser, setRegisterUser] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);

  const handlerUsers = async () => {
    setLoading(true);
    try {
      const result: any = await GetUserEmployee();

      if (result.status === 200) {
        if (result.data.length > 0) {
          let arrayData: Array<Object> = [];
          result.data.map(
            (e: {
              id: number;
              name: string;
              phone: string;
              office: string;
            }) => {
              return arrayData.push({
                id: e.id,
                name: e.name,
                phone: e.phone,
                office: e.office,
              });
            }
          );
          setTitleData(["Id", "Nome", "Telefone", "Cargo"]);
          setUsersData(arrayData);
          setLoading(false);
          return;
        } else {
          setUsersData([]);
          setLoading(false);
          return;
        }
      } else {
        setLoading(false);
        return;
      }
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!registerUser) {
      handlerUsers();
    }
  }, [registerUser]);

  const onActions = (id: any, actions: any) => {
    if (id !== undefined) {
      if (actions === "deleted") {
        setOpen(true);
        setActionIdDeleted(id);
      }
    }
  };

  const handlerDeletedUser = async () => {
    setLoading(true);
    try {
      const data = {
        idUserData: actionIdDeleted,
      };
      const result = await DeteledUserEmployee(data);

      if (result.status === 200) {
        handlerUsers();
        setOpen(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.contentHeader}>
          <div>
            <h4>Bem vindo, {userData?.name}</h4>
          </div>

          <div className={styles.contentRegister}>
            <MdPersonAddAlt1
              size={30}
              color="#4b4b4b"
              style={{
                marginLeft: 10,
                marginRight: 15,
                cursor: "pointer",
              }}
              onClick={() => {
                setRegisterUser(true);
              }}
            />
            <FiLogOut
              size={22}
              color="#4b4b4b"
              style={{
                marginLeft: 10,
                marginRight: 15,
                cursor: "pointer",
              }}
              onClick={() => {
                setUserDataReset();
                setUserDataTokenReset();
                navigate("/");
              }}
            />
          </div>
        </div>
      </div>
      <div className={styles.content}>
        {usersData.length > 0 && !registerUser && (
          <Table data={usersData} titleData={titleData} onActions={onActions} />
        )}
        {!loading && usersData.length === 0 && !registerUser && (
          <div className={styles.newEmployer}>
            <h3>Você não tem funcionários cadastrados</h3>

            <MdOutlineAddCircleOutline
              size={45}
              color="#4b4b4b"
              onClick={() => {
                setRegisterUser(true);
              }}
            />

            <p>Cadastrar</p>
          </div>
        )}
        {registerUser && <RegisterUsers setRegisterUser={setRegisterUser} />}
      </div>
      {open && (
        <Modal setOpen={setOpen}>
          <div>
            <h4>Excluir o usuário id: {String(actionIdDeleted)}</h4>
            <br></br>
            <p>Tem certeza que deseja excluir?</p>
            <div className={styles.gridButton}>
              <Button
                title={"Não"}
                onClick={() => {
                  setOpen(false);
                }}
              />
              <Button
                title={"Sim"}
                onClick={() => {
                  handlerDeletedUser();
                }}
              />
            </div>
          </div>
        </Modal>
      )}
      <Loading loading={loading} />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    userData: safeAccess(state, ["dataUserReducer", "data"], undefined),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setUserDataReset: (value: any) => dispatch(resetUser()),
    setUserDataTokenReset: (value: any) => dispatch(resetAuth()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
