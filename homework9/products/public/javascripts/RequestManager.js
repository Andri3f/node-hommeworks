class RequestManager {
	static async deleteRequest(rout, id) {
		const res = await fetch(rout, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id }),
		})
		const data = await res.json()
		window.location.reload(true)
		return data
	}
}
