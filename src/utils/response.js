const failRes = (res, status, code, errMessage) => {
	return res.status(status).json({
		code: code,
		error: errMessage
	})
}

const successRes = (res, status, data) => {
	return res.status(status).json(data)
}

export {
	failRes,
	successRes
}
