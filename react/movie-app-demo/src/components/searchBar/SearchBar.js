import React, {Component} from 'react';
import './SearchBar.css'
import FontAwesome from 'react-fontawesome';

class SearchBar extends Component {
    state = {
        value: ''
    };

    timeout = null;

    render() {
        const {value} = this.state;

        return <div className='rmdb-searchbar'>
            <div className='rmdb-searchbar-content'>
                <FontAwesome className='rmdb-fa-search' name='search' size='2x'/>
                <input type='text'
                       className='rmdb-searchbar-input'
                       placeholder='Search'
                       onChange={e => this.setState({value: e.target.value},
                           () => {
                               clearTimeout(this.timeout);
                               const {callback} = this.props;
                               const {value} = this.state;

                               this.timeout = setTimeout(() => callback(value), 500)
                           })}
                       value={value}
                />
            </div>
        </div>
    }
}
export default SearchBar;