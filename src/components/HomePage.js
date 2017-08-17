import React from "react";

import {Link} from "react-router-dom";
import Shelf from "./Shelf";

class HomePage extends React.Component {
	
	transformBooksToShelves = (bookArray) => {

		const readingBooks = bookArray.filter(book => book.shelf === "currentlyReading");
		const wantToReadBooks = bookArray.filter(book => book.shelf === "wantToRead");
		const readBooks = bookArray.filter(book => book.shelf === "read");

		return [
			{title: "Currently Reading", list: readingBooks},
			{title: "Want to Read", list: wantToReadBooks},
			{title: "Read", list: readBooks}
		]
	};

	render() {

		const shelves = this.transformBooksToShelves(this.props.bookArray);
		
		const bookShelfNodes = shelves.map((shelf, index) => <Shelf title={shelf.title}
																	books={shelf.list}
																	key={index}
																	loading={this.props.loading}
																	handleBookShelfChange={this.props.handleBookShelfChange}/>);
		return (
			<div className="list-books animated fadeIn">
				<div className="list-books-title">
					<h1><i className="fa fa-book fa-fw"></i>MyReads</h1>
				</div>
				<div className="list-books-content">
					<div>
						{bookShelfNodes}
					</div>
				</div>
				<div className="open-search">
					<Link to="/search">Add a book</Link>
				</div>
			</div>
		)


	}
}

export default HomePage