import { FaArrowLeft } from 'react-icons/fa';
import Form from '../../components/Form'
import { useNavigate } from 'react-router-dom';

const AddCopsPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <FaArrowLeft onClick={() => navigate("/")} size={30}></FaArrowLeft>
            <Form></Form>
        </>
    )
}

export default AddCopsPage;