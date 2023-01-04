import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { Player } from 'video-react';
import ReactPlayer from 'react-player/lazy'
import '../App.scss'

const SingleDancer = () => {
    const { id } = useParams()
    const [dancer, setDancer] = useState(null)
    const [status, setStatus] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const dancerAdder = async () => {
            const res = await fetch(`http://localhost:3001/dancers/${id}`)
            const dancer = await res.json()

            setDancer(dancer)
        }
        dancerAdder()
    },[id])

    const deleteDancer = async () => {
        const res = await fetch(`http://localhost:3001/dancers/${dancer.id}`, {method: 'DELETE'});
        setStatus('Dancers account deleted')
        setTimeout(() => {
            navigate('/AllDancers')
        },1500)
    }   

    if (!dancer) {
        return 'Loading...'
    }

    return (
        <div className="singleDancers">
            <div className="info">
            <h2>{dancer.firstname} {dancer.lastname}</h2>
            
            <li><span>Gender:</span> {dancer.gender}</li>
            <li><span>Age:</span> {dancer.age}</li>
            <li><span>Haircolor:</span> {dancer.hair}</li>
            <li><span>Length:</span> {dancer.length}</li>
            <li><span>Past jobs:</span> {dancer.pastJobs.map((pastJob, i) => i === dancer.pastJobs.length-1 ? pastJob : `${pastJob}, ` )}</li>
            <li><span>Shoesize:</span> {dancer.shoesize}</li>
            <li><span>Size:</span> {dancer.size}</li>
            <li><span>Styles:</span> {dancer.styles}</li>
            <li><span>Tattoos:</span> {dancer.tattoos}</li>
            </div>
            <button id="delete-btn" onClick={() => deleteDancer()}>Delete dancer</button>
            <div className="headPic">
            {dancer.img &&
                <img src={`../img/portraits/${dancer.img}`} style={{maxWidth: '200px'}} alt={dancer.firstname} />
            }
            </div>
            <div className="more-pics">
            {dancer.imgs1 &&
                <img src={`../img/moreImages/${dancer.imgs1}`} style={{maxHeight: '230px'}} alt={dancer.firstname} />
            }
            {dancer.imgs2 &&
                <img src={`../img/moreImages/${dancer.imgs2}`} style={{maxHeight: '230px'}} alt={dancer.firstname} />
            }
            {dancer.imgs3 &&
                <img src={`../img/moreImages/${dancer.imgs3}`} style={{maxHeight: '230px'}} alt={dancer.firstname} />
            }
            </div>
            <div id="videoPlayer">
            {dancer.video ?
            <ReactPlayer url={dancer.video} /> :
            <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U'/>
            }
            </div>
            <Link to="/AllDancers">Back to all dancers</Link>
            <p>{status}</p>
        </div>
    )
}

export default SingleDancer