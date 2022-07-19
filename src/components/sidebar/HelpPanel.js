import React from 'react';

const HelpPanel = (props) => {
	return (
		<div className="sidebar-panel help-panel">
			<div className="shortcuts-container">
				<h3 className="text_white">
					Shortcut keys
				</h3>

				<table>
					<tbody>
						<tr>
							<td>/</td>
							<td>Search Location</td>
						</tr>
						
						<tr>
							<td>b</td>
							<td>Basemaps panel</td>
						</tr>

						<tr>
							<td>l</td>
							<td>Layers panel</td>
						</tr>

						<tr>
							<td>s</td>
							<td>Support panel</td>
						</tr>

						<tr>
							<td>h</td>
							<td>Help panel</td>
						</tr>

						<tr>
							<td>c</td>
							<td>Toggle comparison</td>
						</tr>

						<tr>
							<td>+</td>
							<td>Zoom in</td>
						</tr>

						<tr>
							<td>-</td>
							<td>Zoom out</td>
						</tr>
					</tbody>
				</table>
			</div>

		</div>
	)
}

export default HelpPanel;