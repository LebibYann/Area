import glassIcon from "../assets/images/SearchBarIcon.png";
import "./SearchBar.css";
interface SearchBarProps extends Omit<React.HTMLProps<HTMLInputElement>, "type"> {
}

const SearchBar = ({...props}:SearchBarProps): JSX.Element => {
    return (
        <div className="searchBar">
            <img src={glassIcon} className="glass-icon"/>
            <input type="text" className="search-input" {...props}/>
        </div>
    )
}

export default SearchBar;