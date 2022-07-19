import React from 'react';
import Dialog from 'rc-dialog';

class BookmarkModal extends React.Component {
	constructor(props) {
		super(props);
	}

	state = {
		bookmarkName: '',
		existingBookmarkName: ''
	}


	handleNameChange = (evt) => {
		this.setState({
			bookmarkName: evt.target.value
		})
	}

	saveBookmark() {
		let bookmarksStr = window.localStorage.getItem('bookmarks');
		let bookmarksObj = [];
		if (bookmarksStr) {
			bookmarksObj = JSON.parse(bookmarksStr);
			let existingBookmark = bookmarksObj.find((element) => element.value == this.props.currentUrl);
			if (existingBookmark) {
				this.state.existingBookmarkName = existingBookmark.name;
				this.forceUpdate();
				return;
			}
			bookmarksObj.splice(0, 0, { 'id': bookmarksObj.length, 'name': this.state.bookmarkName, 'value': this.props.currentUrl });
			window.localStorage.setItem('bookmarks', JSON.stringify(bookmarksObj));
		} else {
			bookmarksObj.push({ 'id': bookmarksObj.length, 'name': this.state.bookmarkName, 'value': this.props.currentUrl });
			window.localStorage.setItem('bookmarks', JSON.stringify(bookmarksObj));
		}
		this.props.onUpdateState({ bookmarkModal: false });
		this.state.bookmarkName = '';
		this.props.onUpdateState({ currentUrl: '' });
	}

	closeDialog() {
		this.props.onUpdateState({ bookmarkModal: false });
		this.state.bookmarkName = '';
		this.props.onUpdateState({ currentUrl: '' });
		this.state.existingBookmarkName = '';
	}

	render() {
		return (
			<Dialog className="about-modal" animation="zoom" maskAnimation="fade" title="Add new bookmark" onClose={this.closeDialog.bind(this)} visible={this.props.visible}>
				<div className="bookmark-body">
					<input placeholder="Value" className="modal-bookmarks-input" type="text" value={this.props.currentUrl} readOnly />
					<input placeholder="Bookmark Name..." className="modal-bookmarks-input" type="text" value={this.state.bookmarkName} onChange={(evt) => { this.handleNameChange(evt) }} />

					{this.state.existingBookmarkName ? <p className="bookmark-existing-warning">There is already a bookmark for this url named {this.state.existingBookmarkName}</p> : null}
					<button onClick={() => {
						this.saveBookmark()
					}} disabled={!this.state.bookmarkName} className="bookmark-submit">Save</button>
				</div>

			</Dialog>
		)
	}
}

export default BookmarkModal;
