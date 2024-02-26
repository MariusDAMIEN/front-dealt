import Link from 'next/link'
import { FaHome, FaUser, FaCheck, FaHistory, FaEdit, FaPlus } from 'react-icons/fa'

const Navbar = () => {
    return (
        <div className="navbar">
            <h1>Tasks Lists</h1>
            <ul>
                <li>
                    <Link legacyBehavior href="/overview">
                        <a>
                            <FaHome />
                            Overview
                        </a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="/myself">
                        <a>
                            <FaUser />
                            Myself
                        </a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="/active">
                        <a>
                            <FaCheck />
                            Active
                        </a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="/complete">
                        <a>
                            <FaCheck />
                            Complete
                        </a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="/history">
                        <a>
                            <FaHistory />
                            History
                        </a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="/edit">
                        <a>
                            <FaEdit />
                            Edit
                        </a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="/new">
                        <a>
                            <FaPlus />
                            New
                        </a>
                    </Link>
                </li>
            </ul>
            <style jsx>{`
       .navbar {
        width: 20%;
        height: 100vh;
        background-color: #f0f0f0;
        padding: 20px;
        box-shadow: 5px 0 10px rgba(0,0,0,0.1);
        z-index: 1;
      }
      h1 {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 20px;
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      li {
        margin-bottom: 10px;
      }
      a {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: black;
      }
      a:hover {
        color: blue;
      }
      a:active {
        color: red;
      }
      svg {
        margin-right: 10px;
        filter: drop-shadow(2px 2px 2px rgba(0,0,0,0.2));
        color: #3a9dfc;
        font-size: 30px;
      }
          
      `}</style>
        </div>
    )
}

export default Navbar