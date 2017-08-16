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
		searching: false,
		searchBoxValue: "",
		bookResult: []
	};


	clearResult = () => {
		this.setState({bookResult: [], searching: false})
	};

	search = (keyword) => {
		let self = this;
		if (!!keyword) {
			BooksAPI.search(keyword).then(function(books) {
				self.setState({bookResult: books, searching: false})
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
			self.setState({
				searching: true
			});
			self.search(searchBoxValue)
		}, 300);


	};

	render() {

		const bookSearchResultNodes = (() => {
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

		const loadingNode = (() => {
			return (
				<div className="spinner">
					<div className="dot1"></div>
					<div className="dot2"></div>
				</div>
			)
		})();

		return (
			<div className="search-books">
				<div className="search-books-bar animated fadeIn">
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
						{this.state.searching ? loadingNode :bookSearchResultNodes}
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