import { useNavigate } from "react-router-dom";

import { Button } from "../../components";

import styles from "./Home.module.scss";


const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.Menu}>
            <h1 className={styles.titulo}>Cadastro da comunicação da perda ocorrida</h1>
            <div className={styles.searchInputDiv}>
                <Button text="Buscar, atualizar e excluir" onClick={() => navigate("/search")} />
            </div>
            <div className={styles.buttonInputDiv}>
                <Button text="Adicionar" onClick={() => navigate("/add")} />
            </div>
        </div>
    );

};

export default HomePage;