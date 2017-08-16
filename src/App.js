import React from 'react'
import * as BooksAPI from './BooksAPI'
import {BrowserRouter, Route} from 'react-router-dom'

import './css/App.css';
import './css/animate.css';

const $ = window.$;

import HomePage from "./components/HomePage";
import SearchPage from "./components/SearchPage";

class BooksApp extends React.Component {
	
	// TODO: Add "no book" state

	state = {
		showSearchPage: false,
		loading:true,
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
			loading:false,
			shelves: [
				{title: "Currently Reading", list: readingBooks},
				{title: "Want to Read", list: wantToReadBooks},
				{title: "Read", list: readBooks}
			]
		})
	};

	getAllBooks() {
		let self = this;

		BooksAPI.getAll().then(bookArray => {

			// Transform this book array to the component's state with "putBooksOnShelves"
			self.putBooksOnShelves(bookArray)
		})
	}

	handleBookShelfChange = (bookID, selectedShelf) => {
		let self = this;
		self.setState({
			loading:true,
		});
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
									   loading={this.state.loading}
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
