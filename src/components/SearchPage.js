import React from "react";
import {Link} from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from '../BooksAPI';


const $ = window.$;

class SearchPage extends React.Component {

	// TODO: PropTypes
	
	constructor(props) {
		super(props);
	}

	state = {
		searchBoxValue: "",
		bookResult: []
	};


	clearResult = () => {
		this.setState({bookResult: []})
	};

	search = (keyword) => {
		let self = this;
		if (!!keyword) {
			BooksAPI.search(keyword).then(function(books) {
				self.setState({bookResult: books})
			})
		} else {
			self.clearResult();
		}

	};

	handleSearchBoxChange = (event) => {

		let self = this;
		let searchBoxValue = $.trim(event.target.value);
		this.setState({searchBoxValue: searchBoxValue});

		// If users type continuously, then do not search, 
		// only search after user stop for a while.
		if (typeof self.searchTimeout !== "undefined") {
			clearTimeout(self.searchTimeout);
		}

		this.searchTimeout = setTimeout(function() {
			self.search(searchBoxValue)
		}, 300);


	};
	
	render() {
		
		let bookSearchResultNodes = (() => {
			let bookResult = this.state.bookResult;
			if ($.isArray(bookResult)) {
				return this.state.bookResult.map((book, index) => {
						return (
							<Book info={book} key={index}
								  handleBookShelfChange={this.props.handleBookShelfChange}/>
						)
					}
				);
			}
			return null
		})();

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to="/">Close</Link>
					<div className="search-books-input-wrapper">
						<input type="text"
							   value={this.state.searchBoxValue}
							   onChange={this.handleSearchBoxChange}
							   placeholder="Search by title or author"/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{bookSearchResultNodes}
					</ol>
				</div>
			</div>
		)
	}

	componentDidMount() {
		this.search();
	}
}

export default SearchPage;