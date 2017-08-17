import React from "react";
import {Link} from "react-router-dom";
import Book from "./Book";
import Loading from "./Loading";
import * as BooksAPI from '../BooksAPI';

class SearchPage extends React.Component {

	state = {
		searching: false,
		searchBoxValue: "",
		bookResult: []
	};


	clearResult = () => {
		this.setState({bookResult: [], searching: false})
	};

	search = (keyword) => {
		if (!!keyword) {
			BooksAPI.search(keyword).then((books) => {

				// Check if any books in the search result already exists on the shelves.
				// If it does, then update to show it's current shelf
				if (Array.isArray(books)) {
					const currentBookArray = this.props.bookArray;
					currentBookArray.forEach((currentBook, index) => {
						books.forEach((resultBook, index) => {
							if (currentBook.id === resultBook.id) {
								resultBook.shelf = currentBook.shelf;
							}
						})
					});

					this.setState({bookResult: books, searching: false})
				} else {
					this.clearResult()
				}

			})
		} else {
			this.clearResult();
		}

	};

	handleSearchBoxChange = (event) => {

		const searchBoxValue = event.target.value.trim();
		this.setState({searchBoxValue: searchBoxValue});

		// If users type continuously, then do not search, 
		// only search after user stop for a while.
		if (!!this.searchTimeout) clearTimeout(this.searchTimeout);

		this.searchTimeout = setTimeout(() => {
			this.setState({searching: true});
			this.search(searchBoxValue)
		}, 300);


	};

	render() {

		const bookSearchResultNodes = (() => {
			let bookResult = this.state.bookResult;
			if (Array.isArray(bookResult)) {
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
						{this.state.searching ? <Loading/> : bookSearchResultNodes}
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