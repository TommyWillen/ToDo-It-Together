import { Link } from "react-router-dom"

const MainAsideContent = () => {
    return (
        <div>
            <ul style={{listStyle: "none"}}>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/profile/todos/global">Global Todos</Link></li>
                <li><Link to="/profile">Todos for the Month</Link></li>
                <br />
                <hr />
                <br />
                <li><Link to="/profile">Friends Todos for Today</Link></li>
                <li><Link to="/profile">Friends Global Todos</Link></li>
            </ul>
        </div>
    )
}

export default MainAsideContent
