import { Link } from 'react-router-dom'
import '../App.scss'

const DancerCard = ({props}) => {
    return (
        <div className="DancerCard" >
            {props.img &&
                <img src={`../img/portraits/${props.img}`} style={{maxWidth: '100px'}} alt={props.firstname} />
            }
            <h2>{props.firstname} {props.lastname}</h2>
            <p><span>Gender:</span> {props.gender}</p>
            <p><span>Past jobs:</span> {props.pastJobs.map((pastJob, i) => i === props.pastJobs.length-1 ? pastJob : `${pastJob}, ` )}</p>
            <p><span>Styles:</span> {props.styles}</p>
            <Link to={`/AllDancers/${props.id}`}>Link to dancer</Link>
        </div>
    )
}

export default DancerCard