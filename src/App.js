import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
const $ = window.$;

import Shelf from "./components/Shelf";
import SearchPage from "./components/SearchPage";

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

	showSearchPage = () => {
		this.setState({showSearchPage: true})
	};

	showHomePage = () => {
		this.setState({showSearchPage: false})
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
						<a onClick={this.showSearchPage}>Add a book</a>
					</div>
				</div>
			)
		})();


		return (
			<div className="app">
				{this.state.showSearchPage ? <SearchPage showHomePage={this.showHomePage}/> : homePageNodes}
			</div>
		)
	}

	componentDidMount() {
		// Get all books after the component is mounted
		this.getAllBooks();
	}
}

export default BooksApp
