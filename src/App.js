import React from 'react'
import * as BooksAPI from './BooksAPI'
import {BrowserRouter, Route} from 'react-router-dom'
import HomePage from "./components/HomePage";
import SearchPage from "./components/SearchPage";

import './css/App.css';
import './css/animate.css';

const $ = window.$;

class BooksApp extends React.Component {

	// TODO: Add "no book" state

	state = {
		showSearchPage: false,
		loading: true,
		bookArray: []
	};

	getAllBooks() {
		BooksAPI.getAll().then(bookArray => {
			this.setState({
				bookArray: bookArray,
				loading: false
			});
		})
	}

	handleBookShelfChange = (bookObj, selectedShelf) => {

		// Update to server the changes
		this.setState({
			loading: true
		});

		BooksAPI.update(bookObj, selectedShelf).then(() => {
			let currentBookArray = this.state.bookArray;
			let targetBookIndex = null;
			const bookAlreadyOnShelf = currentBookArray.filter((book, index) => {
					if (book.id === bookObj.id) {
						targetBookIndex = index;
						return book;
					}
				}).length > 0;


			const newBookArray = (() => {

				let toBeUpdatedBookArray = currentBookArray;

				if (bookAlreadyOnShelf) {
					// Modify the current book if it already exists in the book list.
					toBeUpdatedBookArray[targetBookIndex].shelf = selectedShelf;
				} else {
					// If the book does not exist, then append the new book to the current list
					bookObj.shelf = selectedShelf;
					toBeUpdatedBookArray.push(bookObj);
				}

				return toBeUpdatedBookArray;

			})();


			this.setState({
				loading: false,
				bookArray: newBookArray
			});

		});

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
									   bookArray={this.state.bookArray}
									   loading={this.state.loading}
								   />
							   )}
						/>
						<Route path="/search"
							   render={(props) => (
								   <SearchPage
									   handleBookShelfChange={this.handleBookShelfChange}
									   bookArray={this.state.bookArray}
								   />
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
