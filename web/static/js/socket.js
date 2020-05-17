import {Socket} from "phoenix"

const socket = new Socket("/socket", { params: { token: window.userToken } })

socket.connect()

const makeTemplate = ({ content, user }) => `
	<li class="collection-item">
		${content}
		<div class="secondary-content">
			${user ? user.email : 'Anonymous'}
		</div>
	</li>
`;

const renderComment = (comment) => {
	const template = makeTemplate(comment);
	document.querySelector('.collection').innerHTML += template;
};

const renderComments = (comments) => {
	const template = comments.map(makeTemplate).join('');
	document.querySelector('.collection').innerHTML = template;
};

const createSocket = (topicId) => {
	let channel = socket.channel(`comments:${topicId}`, {})
	
	channel.join()
		.receive("ok", ({ comments }) => { renderComments(comments) })
		.receive("error", resp => { console.log("Unable to join", resp) })

	channel.on(`comments:${topicId}:new`, ({ comment }) => renderComment(comment))

	document
		.querySelector('button')
		.addEventListener('click', () => {
			const content = document.querySelector('textarea').value;
			channel.push('comment:add', { content })
		})
};

window.createSocket = createSocket;
