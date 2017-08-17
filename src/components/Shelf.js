import React from "react";
import Book from "./Book";
import Loading from "./Loading";

class Shelf extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {

		const bookNodes = (() => {
			if (Array.isArray(this.props.books)) {
				return this.props.books.map((book, index) => <Book info={book}
																   key={index}
																   handleBookShelfChange={this.props.handleBookShelfChange}/>);
			}

			return null;
		})();
		
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{this.props.title}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{this.props.loading ? <Loading/> : bookNodes}
					</ol>
				</div>
			</div>
		)
	}
}

export default Shelf;