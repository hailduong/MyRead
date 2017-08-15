import React from "react";
import PropTypes from "prop-types";
const $ = window.$;

class Book extends React.Component {

	// TODO: add a placeholder for the image here
	// TODO: transition between before and after the image is loaded
	// TODO: propTypes
	// static propTypes = {
	// 	info: PropTypes.Object,
	// 	handleBookShelfChange: PropTypes.func
	// };

	state = {
		width: '100px',
		height: '140px',
		backgroundSize: 'cover',
		backgroundImage: null,
	};

	render() {

		const bookInfo = this.props.info;

		const bookStyle = {
			width: '100px',
			height: '140px',
			backgroundSize: 'cover',
			backgroundImage: `url(${bookInfo.imageLinks.thumbnail})`
		};
		const title = bookInfo.title;
		const authors = (() => {
			if (typeof bookInfo.authors !== "undefined") {
				return bookInfo.authors.join(', ');
			}

			return null

		})();

		const bookShelfChangerDefaultValue = (() => {
			if (!!bookInfo.shelf) {
				return bookInfo.shelf;
			}

			return "none";
		})();

		return (
			<li>
				<div className="book">
					<div className="book-top">
						<div className="book-cover" style={bookStyle}></div>
						<div className="book-shelf-changer">
							<select defaultValue={bookShelfChangerDefaultValue} onChange={this.handleBookShelfChange}>
								<option value="none" disabled>Move to...</option>
								<option value="currentlyReading">Currently Reading</option>
								<option value="wantToRead">Want to Read</option>
								<option value="read">Read</option>
								<option value="none">None</option>
							</select>
						</div>
					</div>
					<div className="book-title">{title}</div>
					<div className="book-authors">{authors}</div>
				</div>
			</li>
		)
	}

	handleBookShelfChange = (event) => {
		let selectedShelf = $(event.target).val();
		let bookID = this.props.info.id;
		let bookObj = {
			'id': bookID
		};
		this.props.handleBookShelfChange(bookObj, selectedShelf)
	};

	getThumbnailMeta() {
		// TODO: get the natural width/height of the image
		// Use the above simply as: getThumbnailMeta( "http://example.com/img.jpg" );
		let img = new Image();
		img.addEventListener("load", function() {
			alert(this.naturalWidth + ' ' + this.naturalHeight);
		});
	}
}

export default Book;