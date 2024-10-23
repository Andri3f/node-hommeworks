class RequestManager {
	static async deleteRequest(route, body) {
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
}
