class RequestManager {
	static async deleteRequest(route, id) {
		console.log("route==>>>", route)

		const response = await fetch(route, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id }),
		})
		const data = await response.json()
		window.location.reload(true)
		return data
	}
}
