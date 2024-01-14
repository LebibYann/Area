import glassIcon from "../assets/images/SearchBarIcon.png";
import "./SearchBar.css";
interface SearchBarProps extends Omit<React.HTMLProps<HTMLInputElement>, "type"> {
}

/**
 *
 *
 * @param {SearchBarProps} {...props} the props of the component
 * @return {JSX.Element} a search bar
 */
const SearchBar = ({...props}:SearchBarProps): JSX.Element => {
    return (
        <div className="searchBar">
            <img src={glassIcon} className="glass-icon"/>
            <input type="text" className="search-input" {...props}/>
        </div>
    )
}

export default SearchBar;