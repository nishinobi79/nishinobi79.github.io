async function getRepos(n, m) {

    clear()

    const user_url = "https://api.github.com/users/google/repos?q=sort=forks&order=desc"
    response = await fetch(user_url)
    console.log("fetched")
    result = await response.json()

    console.log(result)

    const repoResult = document.getElementById("repoResult")
    
    for (let i = 0; i < n; i++){    

        const anchor = document.createElement("a");
        anchor.href = result[i].html_url;
        anchor.textContent = result[i].full_name;
        repoResult.appendChild(anchor);
        repoResult.appendChild(document.createElement("br"));
    }

}

function clear() {
    while (repoResult.firstChild) {
        repoResult.removeChild(repoResult.firstChild)   
    }
}

async function getOldestForks(repo, m) {
    const urll = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/forks?q=sort=oldest`
    let responsee = await fetch(urll)
    resultt = await responsee.json()

    console.log(resultt)
    return resultt
}

async function greet() {
    alert("Hello World!");
}