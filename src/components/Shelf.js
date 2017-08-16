import React from "react";
import Book from "./Book";
const $ = window.$;

class Shelf extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {

		let self = this;

		const loadingNode = (() => {
			return (
				<div className="spinner">
					<div className="dot1"></div>
					<div className="dot2"></div>
				</div>
			)
		})();

		const bookNodes = (() => {

			if ($.isArray(self.props.books)) {
				return self.props.books.map((book, index) => <Book info={book}
																   key={index}
																   handleBookShelfChange={self.props.handleBookShelfChange}/>);
			}

			return null;
		})();

		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{this.props.title}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{this.props.loading ? loadingNode : bookNodes}
					</ol>
				</div>
			</div>
		)
	}
}

export default Shelf;