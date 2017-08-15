import React from 'react'
import * as BooksAPI from './BooksAPI'
import {BrowserRouter, Route} from 'react-router-dom'

import './App.css'

const $ = window.$;

import HomePage from "./components/HomePage";
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
		BooksAPI.update(bookID, selectedShelf).then(() => {
			self.getAllBooks();
		});

	};

	showSearchPage = () => {
		this.setState({showSearchPage: true})
	};

	showHomePage = () => {
		this.setState({showSearchPage: false})
	};

	render() {

		return (
			<div className="app">
				<BrowserRouter>
					<div>
						<Route exact path="/"
							   render={(props) => (
								   <HomePage
									   handleBookShelfChange={this.handleBookShelfChange}
									   shelves={this.state.shelves}
								   />
							   )}
						/>
						<Route path="/search"
							   render={(props) => (
								   <SearchPage handleBookShelfChange={this.handleBookShelfChange}/>
							   )}
						/>
					</div>
				</BrowserRouter>
			</div>
		)
	}

	componentDidMount() {
		// Get all books after the component is mounted
		this.getAllBooks();
	}
}

export default BooksApp
