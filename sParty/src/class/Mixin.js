export
class Cards {
	constructor(title, desc, ownerId, time, like, visit, people, comments, ownerName = null, ownerImg = null, img = null, id = null) {
		this.title = title
		this.desc = desc
		this.ownerId = ownerId
		this.time = time
		this.like = like
		this.visit = visit
		this.people = people
		this.comments = comments
		this.ownerName = ownerName
		this.ownerImg = ownerImg
		this.img = img
		this.id = id
	}
}

export
class User {
	constructor(id = '', login = '', name = '', image = '', bio = '') {
		this.id = id
		this.login = login
		this.name = name
		this.image = image
		this.bio = bio
	}
}