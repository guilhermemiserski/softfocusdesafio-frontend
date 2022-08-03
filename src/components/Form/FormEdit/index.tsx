import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./FormEdit.module.scss"


interface IFormEdit {
    id: string;
    nameDefault: string;
    emailDefault: string;
    cpfDefault: string;
    latitudeDefault: string;
    longitudeDefault: string;
    typeDefault: string;
    harvestDateDefault: string;
    eventDefault: string;
}

function FormEdit({ id, nameDefault, emailDefault, cpfDefault, latitudeDefault, longitudeDefault, typeDefault, harvestDateDefault, eventDefault }: IFormEdit) {

    const [name, setName] = useState(nameDefault);
    const [email, setEmail] = useState(emailDefault);
    const [cpf, setCpf] = useState(cpfDefault);
    const [longitude, setLongitude] = useState(longitudeDefault);
    const [latitude, setLatitude] = useState(latitudeDefault);
    const [type, setType] = useState(typeDefault);
    const [harvestDate, setHarvestDate] = useState(harvestDateDefault);
    const [event, setEvent] = useState(eventDefault);
    const API_URL = "https://softfocus-api.herokuapp.com" + "/cops";

    const navigate = useNavigate();


    async function postCops(e: any) {
        try {
            let options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    cpf,
                    longitude,
                    latitude,
                    type,
                    harvestDate,
                    event
                })
            };

            fetch(API_URL + id, options)
                .then(res => res.json())
                .then(json => console.log(json))
                .catch(err => console.error('error:' + err));
        } catch (err) {
            console.log(err);
        }
        alert("Alterado com sucesso!");
        setTimeout(() => navigate("/search"), 1000);
    }


    let handleSubmit = async (e: any) => {
        e.preventDefault();
        postCops(e);
    }

    return (
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1>Formulário de alteração COP</h1>
                <div>
                    <label>
                        Nome:
                        <input className={styles.input} type="text" name="name" defaultValue={nameDefault} onChange={(e) => setName(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Email:
                        <input className={styles.input} type="email" name="email" defaultValue={emailDefault} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        CPF(Sem pontos):
                        <input className={styles.input} type="text" maxLength={11} name="cpf" defaultValue={cpfDefault} onChange={(e) => setCpf(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Latitude:
                        <input className={styles.input} type="text" name="latitude" defaultValue={latitudeDefault} onChange={(e) => setLatitude(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Longitude:
                        <input className={styles.input} type="text" name="longitude" defaultValue={longitudeDefault} onChange={(e) => setLongitude(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Tipo da lavoura:
                        <input className={styles.input} type="text" name="type" defaultValue={typeDefault} onChange={(e) => setType(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Data da colheita:
                        <input className={styles.input} type="date" name="harvestDate" defaultValue={harvestDateDefault} onChange={(e) => setHarvestDate(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Evento ocorrido:
                        <select id="event" defaultValue={eventDefault} onChange={(e) => setEvent(e.target.value)}>
                            <option value="CHUVA EXCESSIVA">CHUVA EXCESSIVA</option>
                            <option value="GEADA">GEADA</option>
                            <option value="GRANIZO">GRANIZO</option>
                            <option value="SECA">SECA</option>
                            <option value="VENDAVAL">VENDAVAL</option>
                            <option value="RAIO">RAIO</option>
                        </select>
                    </label>
                </div>

                <input className={styles.buttonSave} type="submit" value="Alterar" />
            </form>
    )
}

export default FormEdit;

