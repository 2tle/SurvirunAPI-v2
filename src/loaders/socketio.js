import { Server } from 'socket.io'
import { authAccessTokenSocketio } from '../api/middlewares/authorization.js'
export default async (app) => {
	app.io = new Server()

	let queue = []
	let roomData = []
	let roomItemData = []
	let roomNumberID = 0

	app.io.use(authAccessTokenSocketio).on('connection', (socket) => {
		socket.on('enqueue', (message) => {
			let queueData;
			const getUser = (id) => {
				const lll = queue.map(dt => dt.socketId)
				if (socket.id in lll) {
					console.log(socket.id + ' already enqueue')
					return;
				} else {
					return User.findOne({ _id: id }).exec()
				}

			}
			const doing = (user) => {
				const jsonData = JSON.parse(message)

				queueData = {
					socketID: socket.id,
					lat: jsonData.latitude,
					lng: Math.abs(jsonData.longitude),
					id: socket.decoded._id,
					email: user.email,
					username: user.username

				}

				console.log(queueData)
				queue.push(queueData)
				console.log(queue)
				if (queue.length >= 3) {
					let firstUser = app.io.sockets.sockets.get(queue[0].socketID)
					let secondUser = app.io.sockets.sockets.get(queue[1].socketID)
					let thirdUser = app.io.sockets.sockets.get(queue[2].socketID)

					var roomNumber = roomNumberID.toString()
					roomData.push({
						roomName: roomNumber,
						users: [{ email: firstUser.decoded.email, username: firstUser.decoded.username, latitude: queue[0].lat, longitude: queue[0].lng, role: 1 },
						{ email: secondUser.decoded.email, username: secondUser.decoded.username, latitude: queue[1].lat, longitude: queue[1].lng, role: 0 },
						{ email: thirdUser.decoded.email, username: thirdUser.decoded.username, latitude: queue[2].lat, longitude: queue[2].lng, role: 0 }]
					})
					console.log(`${roomNumber} room is created`)
					firstUser.join(roomNumber)
					secondUser.join(roomNumber)
					thirdUser.join(roomNumber)
					app.io.to(roomNumber).emit('roomCreated', JSON.stringify({
						data: roomData[roomNumberID]
					}))
					roomNumberID++
					queue.splice(0, 3);
					//queue.splice(0,2);
				}

			}
			getUser(socket.decoded._id).then(doing)
		})
		socket.on('queueLength', () => {
			socket.emit('length', JSON.stringify({
				length: queue.length
			}))
		})
		socket.on('updateCoordinate', (data) => {
			const room_data = JSON.parse(data)
			const roomName = room_data.roomName;

			socket.join(`${roomName}`)
			const latitude = room_data.latitude;
			const longitude = room_data.longitude;
			const userName = socket.decoded.username;
			const UserCoordinate = {
				userName: userName,
				latitude: latitude,
				longitude: Math.abs(longitude)
			}


			app.io.to(`${roomName}`).emit('updateCoordinate', JSON.stringify(UserCoordinate))
			function rand(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			}
			var ran = rand(1, 30)
			console.log(ran)
			if (ran == 30) {
				//아이템 생성 
				app.io.to(`${roomName}`).emit('makeBox', JSON.stringify({
					roomName: `${roomName}`,
					latitude: UserCoordinate.latitude + 0.0005,
					longitude: UserCoordinate.longitude + 0.0005
				}))
			}
		})
		socket.on('addBoom', (data) => {
			const room_data = JSON.parse(data)
			const roomName = room_data.roomName;

			socket.join(`${roomName}`)
			app.io.to(`${roomName}`).emit('addBoom')
		})
		socket.on('getZombie', (data) => {
			const room_data = JSON.parse(data)
			const roomName = room_data.roomName;
			socket.join(`${roomName}`)
			app.io.to(`${roomName}`).emit('addZombie')
		})
		socket.on('getItem', (data) => {
			const room_name = JSON.parse(data)
			socket.join(`${room_name.roomName}`)
			socket.to(`${room_name.roomName}`).emit('getItem')
		})
		socket.on('testGemItem', (data) => {
			const room_data = JSON.parse(data)
			socket.to(`${room_data.roomName}`).emit('getItem')
		})
		socket.on('deleteBox', (data) => {
			const room_data = JSON.parse(data)
			app.io.to(`${room_data.roomName}`).emit('deleteBox')
		})
		socket.on('meetZombies', (data) => {
			const jsonData = JSON.parse(data)
			socket.to(`${jsonData.roomName}`).emit('meetZombies')
		})
		socket.on('laboratory', (data) => {
			const room_data = JSON.parse(data)
			const userCoordinate = {
				lastData: room_data.lastData,
				scientist: room_data.scientist,
				roomName: room_data.roomName
			}
			socket.to(`${room_data.roomName}`).emit('laboratory', JSON.stringify(userCoordinate))
		})
		socket.on('disconnect', () => {
			const finder = (element) => element.socketID == socket.id
			const index = queue.findIndex(finder)
			if (index != -1) queue.splice(index, 1)
			console.log(queue)
			console.log('user disconnected')
		})
	})
}