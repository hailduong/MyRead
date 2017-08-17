import React from "react";

class Book extends React.Component {
	
	// TODO: propTypes
	// static propTypes = {
	// 	info: PropTypes.Object,
	// 	handleBookShelfChange: PropTypes.func
	// };

	render() {

		const bookInfo = this.props.info;

		const imageLinks = !!bookInfo.imageLinks && !!bookInfo.imageLinks.thumbnail
			? bookInfo.imageLinks.thumbnail
			: "./images/no-cover-placeholder.png";

		const bookStyle = {
			width: '100px',
			height: '140px',
			backgroundSize: 'cover',
			backgroundImage: `url(${imageLinks})`
		};

		const title = bookInfo.title;

		const authors = !!bookInfo.authors ? bookInfo.authors.join(', ') : "";
		
		const bookShelfChangerDefaultValue = !!bookInfo.shelf ? bookInfo.shelf : ""; 

		return (
			<li>
				<div className="book animated fadeIn">
					<div className="book-top">
						<a href={bookInfo.previewLink} target="_blank" className="book-cover" style={bookStyle}></a>
					</div>
					<div className="book-title">{title}</div>
					<div className="book-authors">{authors}</div>
					<div className="book-shelf-changer">
						<span>Move</span>
						<select defaultValue={bookShelfChangerDefaultValue} onChange={this.handleBookShelfChange}>
							<option value="" disabled>Move to...</option>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							<option value="none">None</option>
						</select>
					</div>
				</div>
			</li>
		)
	}

	handleBookShelfChange = (event) => {
		const selectedShelf = event.target.value.trim();
		const bookObj = this.props.info;
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