import { FaArrowLeft } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import FormEdit from '../../components/Form/FormEdit';

const EditCopsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const objeto: any = location.state;
    const id = objeto.id;
    const name = objeto.name;
    const email = objeto.email;
    const cpf = objeto.cpf;
    const latitude = objeto.latitude;
    const longitude = objeto.longitude;
    const type = objeto.type;
    const harvestDate = objeto.harvestDate;
    const event = objeto.event;

    return (
        <>
            <FaArrowLeft onClick={() => navigate("/search")} size={30}></FaArrowLeft>
            <FormEdit id={id} nameDefault={name} emailDefault={email} cpfDefault={cpf} latitudeDefault={latitude} longitudeDefault={longitude} typeDefault={type} harvestDateDefault={harvestDate} eventDefault={event}></FormEdit>
        </>
    )
}

export default EditCopsPage;