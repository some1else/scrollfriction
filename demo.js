window.onload = () => {
	window.scrollTo(0, 0)
	let currentScroll = 0
	const body = document.body,
		html = document.documentElement
	const documentHeight = Math.max(
		body.scrollHeight,
		body.offsetHeight,
		html.clientHeight,
		html.scrollHeight,
		html.offsetHeight
	)
	const viewportHeight = window.innerHeight
	const scrollDistance = documentHeight - viewportHeight
	// [128, 256, 384, 512, 640, 768, 896, 1024]
	const frictMap = [0, 0.1, 0.3, 0.84, 0.73, 0.3, 0.1, 0]

	const lerp = (a, b, t) => {
		return a * (1 - t) + b * t
	}

	const getCurrentScroll = () => {
		return 512
	}

	const getFriction = scrollPosition => {
		// const lolProgress = scrollPosition / documentHeight
		const cellSize = scrollDistance / 8
		const progress = scrollPosition / cellSize
		console.log(progress)
		const a = Math.floor(progress)
		const interpolate = progress - a
		const b = a !== 7 ? a + 1 : a
		const frictA = frictMap[a] || 0
		const frictB = frictMap[b] || 0
		const friction = lerp(frictA, frictB, interpolate)
		return friction
	}

	const scrollHandler = e => {
		// get current scroll
		const { scrollTop } = document.documentElement
		const friction = getFriction(scrollTop)
		const amountScrolled = scrollTop - currentScroll
		const amountScrolledWithFrict = amountScrolled * (1 - friction)
		const newScrollWithFriction = currentScroll + amountScrolledWithFrict
		window.scrollTo(0, newScrollWithFriction)
		currentScroll = newScrollWithFriction
		// debugger
		// get current friction
		// estimate new scroll with friction applied
		// scroll
		// e.preventDefault()
		// return false
	}
	window.addEventListener("scroll", scrollHandler)
}
