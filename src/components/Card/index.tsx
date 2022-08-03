import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";
import { FaEdit, FaTimes } from "react-icons/fa";
import styles from "./Card.module.scss";

interface ICard {
    id: string;
    name: string
    email: string;
    cpf: string;
    longitude: string;
    latitude: string;
    type: string;
    harvestDate: string;
    event: string;
    children: ReactNode;
}

const Card = ({ id, children, name, email, cpf, longitude, latitude, type, harvestDate, event }: ICard) => {

    const API_URL = "https://softfocus-api.herokuapp.com" + "/cops/";
    const navigate = useNavigate();

    const deletar = (id: string) => {
        let options = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(API_URL + id, options)
            .then(res => res.json())
            .then(json => console.log(json))
            .catch(err => console.error('error:' + err));

        window.location.reload();
    }


    return (
        <div className={styles.Card}>
            <FaEdit onClick={() => navigate("/edit", { state: { id: id, name, email, cpf, longitude, latitude, type, harvestDate, event} })} className={styles.iconsCard} size={25}></FaEdit>
            <FaTimes onClick={() => deletar(id)} className={styles.iconsCard} size={25}></FaTimes>
            <h2>{name}</h2>

            <div className={styles.content}>{children}</div>
        </div>
    );
};

export default Card;