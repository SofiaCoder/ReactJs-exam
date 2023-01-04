import { useEffect, useState } from "react"
import DancerCard from '../components/DancerCard'
import '../App.scss'
import {
    FormControl,
    FormLabel,
    Select,
    MenuItem,
    FormGroup,
    FormControlLabel,
    Checkbox
} from '@mui/material'
import { sortBy } from "lodash"



const AllDancers = () => {
    const [dancers, setDancers] = useState([])
    const [sortField, setSortField] = useState('firstname')
    const [showGender, setShowGender] = useState({
        "female": false,
        "male": false,
        "non-binary": false
    })
    const gender = ["female", "male", "non-binary"]

    // Handles the select-form
    const handleChange = (e) => {
        setSortField(e.target.value)
    }

    //Handles the checkboxes
    const changeShowColors = (e) => {
        setShowGender({
            ...showGender,
            [e.target.name]: e.target.checked 
        })
    }

    //Fetch the data from dancers.json
    useEffect(() => {
        const getDancers = async () => {
            const res = await fetch('http://localhost:3001/dancers/')
            const dancers = await res.json()

            setDancers(dancers)
        }
        getDancers()
    }, [])

    //Filters and sorts all data
    let filteredDancers = dancers.filter((dancer) => {
        return showGender[dancer.gender.toLowerCase()]
    })
    if (showGender['male'] === false && showGender['female'] === false && showGender['non-binary'] === false) {
        filteredDancers = dancers
    } 
    const sortedDancers = sortBy(filteredDancers, sortField, 'asc')

    
    if (!dancers) {
        return "Loading..."
    }

    return (
            <div className="AllDancers">
                <div className="form">
                <FormControl>
                    <FormLabel>Sort by:</FormLabel>
                    <Select value={sortField} onChange={handleChange}>
                        <MenuItem value="firstname">Firstname</MenuItem>
                        <MenuItem value="lastname">Lastname</MenuItem>
                        <MenuItem value="age">Age</MenuItem>
                    </Select>
                </FormControl>
                <FormGroup>
                    <FormLabel>Filter on gender</FormLabel>
                    {gender.map((gen, i) =>
                    <FormControlLabel
                        key={i}
                        label={gen}
                        control={
                            <Checkbox checked={showGender[gen]} onChange={changeShowColors} name={gen} />
                        }
                    />
                    )}
                </FormGroup>
                </div>
                <div className="DanceCards"> 
                    {sortedDancers.map((dancer) => 
                        <DancerCard key={dancer.id} props={dancer} />
                    )}
                </div>
            </div>
    )
}

export default AllDancers