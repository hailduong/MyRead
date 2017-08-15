import React from "react";

import {Link} from "react-router-dom";
import Shelf from "./Shelf";

class HomePage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {

		const bookShelfNodes = (() => {
			return this.props.shelves.map((shelf, index) => {
				return (<Shelf title={shelf.title}
							   books={shelf.list}
							   key={index}
							   handleBookShelfChange={this.props.handleBookShelfChange}/>)
			})
		})();


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
					<Link to="/search">Add a book</Link>
				</div>
			</div>
		)


	}
}

export default HomePage