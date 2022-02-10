async function getInput() {
	org = document.getElementById("organization").value;
	numberOfRepos = document.getElementById("number1").value;
	numberOfForkers = document.getElementById("number2").value;

	getRepos(numberOfRepos, numberOfForkers, org);
}

async function getRepos(n, m, organization) {
	clear();

	for (let x = 1; x <= Math.floor(n / 100); x++) {
		const user_url = `https://api.github.com/search/repositories?q=user:\"${organization}\"&page=${x}&sort=forks&order=desc&per_page=100`;
		let response = await fetch(user_url);
		// console.log("fetched")
		let result = await response.json();

		console.log(result);

		const repoResult = document.getElementById("repoResult");

		for (let i = 0; i < 100; i++) {
			let repoElement = document.createElement("div");
			repoElement.innerHTML = make_card();
			repoResult.appendChild(repoElement);

			let repoElementHeading = repoElement.querySelector("h5");

			const anchor = document.createElement("a");
			anchor.href = result.items[i].html_url;
			anchor.textContent = result.items[i].full_name;
			repoElementHeading.appendChild(anchor);

			var button = document.createElement("button");
			button.innerHTML = "Fetch Forks";
			repoElement.querySelector("div").appendChild(button);
			button.addEventListener("click", function () {
				getOldestForks(result.items[i], m, repoElement.querySelector("p"));
			});

			repoElement.appendChild(document.createElement("br"));
		}
	}
	const user_url = `https://api.github.com/search/repositories?q=user:\"${organization}\"&page=${Math.floor(n / 100) + 1}&sort=forks&order=desc&per_page=100`;
	let response = await fetch(user_url);
	let result = await response.json();

	console.log(result);

	const repoResult = document.getElementById("repoResult");

	for (let i = 0; i < n % 100; i++) {
		let repoElement = document.createElement("div");
		repoElement.innerHTML = make_card();
		repoResult.appendChild(repoElement);

		let repoElementHeading = repoElement.querySelector("h5");

		const anchor = document.createElement("a");
		anchor.href = result.items[i].html_url;
		anchor.textContent = result.items[i].full_name;
		repoElementHeading.appendChild(anchor);

		var button = document.createElement("button");
		button.innerHTML = "Fetch Forks";
		repoElement.querySelector("div").appendChild(button);
		button.addEventListener("click", function () {
			getOldestForks(result.items[i], m, repoElement.querySelector("p"));
		});

		repoElement.appendChild(document.createElement("br"));
	}
}

function clear() {
	while (repoResult.firstChild) {
		repoResult.removeChild(repoResult.firstChild);
	}
}

function clear1(repoElement) {
	while (repoElement.firstChild) {
		repoElement.removeChild(repoElement.firstChild);
	}
}

async function getOldestForks(repo, m, repoElement) {
	clear1(repoElement);
	const url = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/forks?q=repo:${repo.name}&sort=oldest`;
	console.log(url);
	let response = await fetch(url);
	let result = await response.json();

	console.log(result);
	const ol = document.createElement("ol");
	for (let i = 0; i < m; i++) {
		ol.innerHTML += `<li><a href = ${result[i].owner.html_url}>${result[i].owner.login}</a></li>`;
	}

	repoElement.innerHTML += ol.outerHTML;
}
