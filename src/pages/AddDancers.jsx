import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import '../App.scss'


const AddDancers = () => {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [gender, setGender] = useState('')
    const [age, setAge] = useState('')
    const [length, setLength] = useState('')
    const [size, setSize] = useState('')
    const [hair, setHair] = useState('')
    const [shoesize, setShoesize] = useState('')
    const [pastJobs, setPastJobs] = useState([])
    const [pastJob, setPastJob] = useState('')
    const [styles, setStyles] = useState([])
    const [style, setStyle] = useState('')
    const [tattoos, setTattoos] = useState('')
    const navigate = useNavigate()

   
    const handleChange = (setState, oldArr, newValue) => {
        setState(() => [...oldArr, newValue]);
    };

    const deleteItem = (arr, index, setState) => {
        const newArr = [...arr]
        newArr.splice(index, 1)
        setState(newArr)
    };
   
    const DanceAdder = async (e) => {
        e.preventDefault()

        const newDancer = {
            firstname, lastname, gender, age, length, size,
            hair, shoesize, pastJobs, styles, tattoos
        }
        
        const res = await fetch(`http://localhost:3001/dancers/`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newDancer)
            },
            setTimeout(() => {
                navigate('/AllDancers')
            }, 1500)
        )
    }

    return (
        <form className="AddDancers">
            <section className="col1">
                <label htmlFor="firstname">Firstname:</label>
                <input id="firstname" type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />

                <label htmlFor="lastname">Lastname:</label>
                <input id="lastname" type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />

                <label htmlFor="gender">Gender:</label>
                <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} >
                    <option value='Female'>Female</option>
                    <option value='Male'>Male</option>
                    <option value='Non-binary'>Non-binary</option>
                </select>

                <label htmlFor="age">Age:</label>
                <input id="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} />

                <label htmlFor="length">Length:</label>
                <input id="length" type="number" value={length} onChange={(e) => setLength(e.target.value)} />

                <label htmlFor="size">Size:</label>
                <input id="size" type="number" value={size} onChange={(e) => setSize(e.target.value)} />
            
                <label htmlFor="hair">Haircolor:</label>
                <select id="hair" value={hair} onChange={(e) => setHair(e.target.value)} >
                    <option value='black'>Black</option>
                    <option value='brown'>Brown</option>
                    <option value='red'>Red</option>
                    <option value='blond'>Blond</option>
                    <option value='bald'>Bald</option>
                    <option value='other'>Other</option>
                </select>

                <label htmlFor="shoesize">Shoesize:</label>
                <input id="shoesize" type="number" value={shoesize} onChange={(e) => setShoesize(e.target.value)} />
            </section>
            <section className="col2">
                <div className="arrAdder" id="pastJobs">
                    <label htmlFor="pastJob">Add past job:</label>
                    <input id="pastJob" type="text" value={pastJob} onChange={(e) => setPastJob(e.target.value)} />
                    <button className="arrAdder-btn" id="pastJobs-btn" onClick={(e) => {
                        e.preventDefault()
                        handleChange(setPastJobs, pastJobs, pastJob)
                        setPastJob('')}}>Add job</button>
                    {pastJobs.map((job, index) => 
                        <div key={index}>
                            <li>{job}<button className="arrAdder-list-btn" onClick={(e) => {
                                e.preventDefault()
                                deleteItem(pastJobs, index, setPastJobs)
                            }}>Delete</button></li>
                        </div>   
                    )}
                </div>

                <div className="arrAdder">
                    <label htmlFor="style">Dancestyle:</label>
                    <input id="style" type="text" value={style} onChange={(e) => setStyle(e.target.value)} />
                    <button className="arrAdder-btn" onClick={(e) => {
                        e.preventDefault()
                        handleChange(setStyles, styles, style)
                        setStyle('')
                    }}>Add dancetyle</button>
                    {styles.map((style, index) => 
                        <div key={index}>
                            <li>{style}<button className="arrAdder-list-btn" onClick={(e) => {
                                e.preventDefault()
                                deleteItem(styles, index, setStyles)
                            }}>Delete</button></li>
                        </div> 
                    )}
                </div>

                <label htmlFor="tattoos">Tattoos:</label>
                <select id="tattoos" value={tattoos} onChange={(e) => setTattoos(e.target.value)} >
                    <option value='yes'>Yes</option>
                    <option value='no'>No</option>
                </select>
            </section>
            <button id="submit-btn" onClick={DanceAdder}>Submit</button>
        </form>
    )
}

export default AddDancers