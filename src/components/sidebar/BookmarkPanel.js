import React from 'react';
import { Button, Icon, Popup } from 'semantic-ui-react';
import { faLayerGroup, faMap, faSatellite, faSatelliteDish, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class BookmarkPanel extends React.Component {
	constructor(props) {
		super(props);
	}

	state = {
		copyUrl: ''
	}

	goToBookmark(value) {
		window.open(value.href, "_blank")
	}

	deleteBookmark(id) {
		let bookmarksStr = window.localStorage.getItem('bookmarks');
		let bookmarksObj = [];
		if (bookmarksStr) {
			bookmarksObj = JSON.parse(bookmarksStr);
			let toDelIndex = bookmarksObj.findIndex((element) => element.id == id);
			if (toDelIndex > -1) {
				bookmarksObj.splice(toDelIndex, 1);
				window.localStorage.setItem('bookmarks', JSON.stringify(bookmarksObj));
				this.forceUpdate();
			}
		}
	}

	renderBookmarks = () => {
		let bookmarksStr = window.localStorage.getItem('bookmarks');
		let bookmarksObj = [];
		if (bookmarksStr && bookmarksStr != '[]') {
			bookmarksObj = JSON.parse(bookmarksStr);

			return bookmarksObj.map((item, key) => {
				return (
					<div key={key}>
						<p className="delete-bookmark" onClick={(event) => {
							this.deleteBookmark(item.id);
						}}>X</p>

						<li onClick={() => {
							this.goToBookmark(item.value)
						}}>
							<div>
								<p className="bookmark-title">{item.name}</p>
								<p title={item.value} className="bookmark-description">{item.value.length > 50 ? item.value.substring(0, 50) + '...' : item.value.length}</p>
							</div>
						</li>
					</div>
				)
			})
		} else {
			return (
				<li className="no-hover">
					<p className="layer-title text_description">No bookmarks yet
					</p>
				</li>
			)
		}
	}

	render() {
		return (
			<div className="sidebar-panel bookmarks-panel">
				<h3 className="text_white text_center">Bookmarks</h3>

				<div className="social-btns">
					<Popup position="bottom left" trigger={<Button onClick={() => {
						this.props.onUpdateState({ bookmarkModal: true });
					}} icon={'star'}></Button>}>Bookmark Current URL</Popup>
				</div>

				<ul ref={ref => this.list = ref}>
					{this.renderBookmarks()}
				</ul>
			</div>
		)
	}
}

export default BookmarkPanel;