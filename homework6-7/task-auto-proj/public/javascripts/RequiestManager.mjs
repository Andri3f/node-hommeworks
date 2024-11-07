class RequestManager {
	static async deleteReq(route, body) {
		const response = await fetch(route, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		})
		const data = await response.json()

		if (data.success) {
			window.location.reload(true)
		} else {
			throw new Error(data.error)
		}

		return data
	}
	static setImageToImage(event, imgSelector) {
		const file = event.target.files[0]
		if (file && file.type.startsWith("image/")) {
			const reader = new FileReader()
			reader.onload = function (e) {
				const imgEl = document.querySelector(imgSelector)
				imgEl.src = e.target.result
			}
			reader.readAsDataURL(file)
		}
	}
	static onInputFile(event, selector) {
		RequestManager.setImageToImage(event, selector)
	}
}
