import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
const $ = window.$;

import Shelf from "./components/Shelf";

// TODO: Remove this; Exposing currently for testing on browser console.
window.BooksAPI = BooksAPI;


class BooksApp extends React.Component {

	// TODO: Add loading state
	// TODO: Add "no book" state

	state = {
		/**
		 * TODO: Instead of using this state variable to keep track of which page
		 * we're on, use the URL in the browser's address bar. This will ensure that
		 * users can use the browser's back and forward buttons to navigate between
		 * pages, as well as provide a good URL they can bookmark and share.
		 */
		showSearchPage: false,
		shelves: [
			{title: "Currently Reading", list: []},
			{title: "Want to Read", list: []},
			{title: "Read", list: []}
		]
	};

	render() {

		const bookShelfNodes = (() => {
			return this.state.shelves.map((shelf, index) => {
				return (<Shelf title={shelf.title}
							   books={shelf.list}
							   key={index}
							   handleBookShelfChange={this.handleBookShelfChange}/>)
			})
		})();

		const homePageNodes = (() => {
			return (
				<div className="list-books">
					<div className="list-books-title">
						<h1>MyReads</h1>
					</div>
					<div className="list-books-content">
						<div>
							{bookShelfNodes}
						</div>
					</div>
					<div className="open-search">
						<a onClick={() => this.setState({showSearchPage: true})}>Add a book</a>
					</div>
				</div>
			)
		})();

		const searchPageNodes = (() => {
			return (
				<div className="search-books">
					<div className="search-books-bar">
						<a className="close-search" onClick={() => this.setState({showSearchPage: false})}>Close</a>
						<div className="search-books-input-wrapper">
							{/* 
							 NOTES: The search from BooksAPI is limited to a particular set of search terms.
							 You can find these search terms here:
							 https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

							 However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
							 you don't find a specific author or title. Every search is limited by search terms.
							 */}
							<input type="text" placeholder="Search by title or author"/>
						</div>
					</div>
					<div className="search-books-results">
						<ol className="books-grid"></ol>
					</div>
				</div>)
		})();

		return (
			<div className="app">
				{this.state.showSearchPage ? searchPageNodes : homePageNodes}
			</div>
		)
	}

	putBooksOnShelves = (bookArray) => {

		// Save all these books for later use.
		this.allBooks = bookArray;

		// Transform this array and change it to component's state
		let readingBooks = bookArray.filter(book => book.shelf === "currentlyReading");
		let wantToReadBooks = bookArray.filter(book => book.shelf === "wantToRead");
		let readBooks = bookArray.filter(book => book.shelf === "read");

		this.setState({
			shelves: [
				{title: "Currently Reading", list: readingBooks},
				{title: "Want to Read", list: wantToReadBooks},
				{title: "Read", list: readBooks}
			]
		})
	};

	getAllBooks() {
		let self = this;

		// TODO: Remove this; Exposing currently for testing on browser console only.
		window.bookApp = this;

		BooksAPI.getAll().then(bookArray => {

			// Transform this book array to the component's state with "putBooksOnShelves"
			self.putBooksOnShelves(bookArray)
		})
	}

	handleBookShelfChange = (bookID, selectedShelf) => {
		let self = this;
		
		BooksAPI.update(bookID, selectedShelf).then(bookShelvesObject => {
			
			// The idea here is to transform the response object to a new updated books array,
			// using the "allBooks" array that we saved on the first time the books were loaded.
			
			let updatedAllBooksArray = [];
			$.each(bookShelvesObject, function(key, booksOnShelfArray) {
				booksOnShelfArray.forEach(function(bookID, index) {

					let updatedBooks = self.allBooks
						.filter(book => book.id === bookID)
						.map(book => {
							book.shelf = key;
							return book
						});

					updatedAllBooksArray = updatedAllBooksArray.concat(updatedBooks)
				})
			});
			

			// Then we update the state of this book app with the updated books array
			self.putBooksOnShelves(updatedAllBooksArray);
		});

	};

	componentDidMount() {
		// Get all books after the component is mounted
		this.getAllBooks();
	}
}

export default BooksApp
