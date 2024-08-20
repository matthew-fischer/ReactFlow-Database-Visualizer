import './error.css';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="error_page" >
            <h1>This Relation Diagram doesn't exist yet.</h1>
            <div className='text'>
                <p>The URL entered does not have a relation diagram created yet.</p>
            </div>
            <div className='link'>
                <Link to={"/"} 
                style={{textDecoration: "none", color: "rgb(159, 55, 55)"}} >Link to Homepage</Link>
            </div>
        </div>
    )
};

export default ErrorPage;