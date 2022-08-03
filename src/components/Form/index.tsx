import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Form.module.scss";
import { validate } from 'gerador-validador-cpf'
import * as EmailValidator from 'email-validator';
import { ICops } from "../../types/Cops";
import { getCops } from "../../lib/api";


function Form() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [type, setType] = useState("");
    const [harvestDate, setHarvestDate] = useState("");
    const [event, setEvent] = useState("");
    const [cops, setCops] = useState<ICops[]>([]);
    const API_URL = "https://softfocus-api.herokuapp.com/" + "/cops";
    let haveDivergeCops = false;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCops = async () => {
            const payload = await getCops();
            setCops(payload);
        };

        fetchCops();
    }, []);



    let successFunction = (position: any) => {
        setLatitude(position.coords.latitude.toFixed(6).replace(",", "."));
        setLongitude(position.coords.longitude.toFixed(6).replace(",", "."));
    }

    let getLngLat = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successFunction);
        } else {
            alert('Ative a geolocalização no seu Browser!');
        }

    }

    let getDistanceFromLatLon = (p1lat: any, p1long: any, p2lat: any, p2long: any) => {
        var deg2rad = function (deg: any) { return deg * (Math.PI / 180); },
            R = 6371,
            dLat = deg2rad(p2lat - p1lat),
            dLng = deg2rad(p2long - p1long),
            a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(deg2rad(p1lat))
                * Math.cos(deg2rad(p1lat))
                * Math.sin(dLng / 2) * Math.sin(dLng / 2),
            c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return parseFloat((R * c).toFixed(2));
    }

    let compareCop = () => {
        cops.forEach((cops) => {
            if (cops.harvestDate.slice(0, 10) === harvestDate) {
                console.log(getDistanceFromLatLon(cops.latitude, cops.longitude, latitude, longitude));
                if (getDistanceFromLatLon(cops.latitude, cops.longitude, latitude, longitude) < 10) {
                    if (cops.event !== event) {
                        haveDivergeCops = true;
                    }
                }
            }
        });
    }

    let handleSubmit = async (e: any) => {

        if (EmailValidator.validate(email) === true) {
            if (validate(cpf) === true) {
                compareCop();
                if (haveDivergeCops === true) {
                    if (window.confirm("Evento divergente no raio de 10km já cadastrado no Banco de dados, deseja continuar?") === true) {
                        postCops();
                    }else
                    e.preventDefault();
                }else
                postCops();
            } else
                alert("CPF INVÁLIDO");
        } else
            alert("E-MAIL INVÁLIDO");

        function postCops() {
            e.preventDefault();
            try {
                let options = {
                    method: 'POST',
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

                fetch(API_URL, options)
                    .then(res => res.json())
                    .then(json => console.log(json))
                    .catch(err => console.error('error:' + err));
            } catch (err) {
                console.log(err);
            }
            alert("Sucesso!");
            setTimeout(() => navigate("/"), 1000);
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h1>Formulário de inclusão COP</h1>
            <div>
                <label>
                    Nome:
                    <input required className={styles.input} type="text" placeholder='Mário Carneiro' name="name" onChange={(e) => setName(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Email:
                    <input required className={styles.input} type="email" placeholder='mariocarneiro.123@hotmail.com' name="email" onChange={(e) => setEmail(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    CPF(Sem pontos):
                    <input required className={styles.input} type="text" maxLength={11} value={cpf} placeholder='06377268041' name="cpf" onChange={(e) => setCpf(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Latitude:
                    <input required className={styles.input} value={latitude} type="text" placeholder='-25.832412' name="latitude" onChange={(e) => setLatitude(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Longitude:
                    <input required className={styles.input} value={longitude} type="text" placeholder="-52.727803" name="longitude" onChange={(e) => setLongitude(e.target.value)} />
                </label>
            </div>
            <span onClick={() => getLngLat()}>Clique para pegar as coordenadas atuais</span>
            <div>
                <label>
                    Tipo da lavoura:
                    <input required className={styles.input} type="text" placeholder='Soja' name="type" onChange={(e) => setType(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Data da colheita:
                    <input required className={styles.input} type="date" placeholder='20000' name="harvestDate" onChange={(e) => setHarvestDate(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Evento ocorrido:
                    <select id="event" onChange={(e) => setEvent(e.target.value)} required>
                        <option value="">Selecione uma opção</option>
                        <option value="CHUVA EXCESSIVA">CHUVA EXCESSIVA</option>
                        <option value="GEADA">GEADA</option>
                        <option value="GRANIZO">GRANIZO</option>
                        <option value="SECA">SECA</option>
                        <option value="VENDAVAL">VENDAVAL</option>
                        <option value="RAIO">RAIO</option>
                    </select>
                </label>
            </div>

            <input className={styles.buttonSave} type="submit" value="Salvar" />
        </form>
    )
}

export default Form;