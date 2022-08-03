import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Card, Search } from '../../components';
import { getCops } from '../../lib/api';
import { ICops } from '../../types/Cops';

const AddVehiclesPage = () => {
    const navigate = useNavigate();
    const [cops, setCops] = useState<ICops[]>([]);
    const [filteredResults, setFilteredResults] = useState<ICops[]>([]);
    const [search, setSearch] = useState<string>("");


    useEffect(() => {
        const fetchCops = async () => {
            const payload = await getCops();
            setCops(payload);
        };

        fetchCops();
    }, []);

    const searchItems = (searchValue: string) => {
        setSearch(searchValue);
        if (search !== '') {
            const filteredData = cops.filter((cpf) => {
                return Object.values(cpf).join('').toLowerCase().includes(search.toLowerCase())
            })
            setFilteredResults(filteredData);
            console.log(filteredData);
        }
        else {
            setFilteredResults(cops);
            console.log(cops);
        }
    }

    return (
        <>
            <FaArrowLeft onClick={() => navigate("/")} size={30}></FaArrowLeft>
            <Search maxLenght={11} placeholder='Digite o CPF do produtor rural...' onChange={(e) => searchItems(e.target.value)}></Search>
            {search.length > 1 ? (
                filteredResults.map((cop, index) => {
                    return (
                        <Card key={index} id={cop._id} name={cop.name} cpf={cop.cpf} email={cop.email} type={cop.type} event={cop.event} latitude={cop.latitude} longitude={cop.longitude} harvestDate={cop.harvestDate}>
                            <p>Email: {cop.email}</p>
                            <p>CPF: {cop.cpf}</p>
                            <p>Tipo da lavoura: {cop.type}</p>
                            <p>Evento: {cop.event}</p>
                            <p>Latitude: {cop.latitude}</p>
                            <p>Longitude: {cop.longitude}</p>
                            <p>Data colheita: {cop.harvestDate.slice(0,10)}</p>
                        </Card>
                    )
                })
            ) : cops.map((cop, index) => {
                return (
                    <Card key={index} id={cop._id} name={cop.name} cpf={cop.cpf} email={cop.email} type={cop.type} event={cop.event} latitude={cop.latitude} longitude={cop.longitude} harvestDate={cop.harvestDate}>
                            <p>Email: {cop.email}</p>
                            <p>CPF: {cop.cpf}</p>
                            <p>Tipo da lavoura: {cop.type}</p>
                            <p>Evento: {cop.event}</p>
                            <p>Latitude: {cop.latitude}</p>
                            <p>Longitude: {cop.longitude}</p>
                            <p>Data colheita: {cop.harvestDate.slice(0,10)}</p>
                        </Card>
                )
            })}
        </>
    )
}

export default AddVehiclesPage;