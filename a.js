async function getInput() {
    org = document.getElementById("organization").value;
    numberOfRepos = document.getElementById("number1").value;
    numberOfForkers = document.getElementById("number2").value;

    // console.log(numberOfRepos + ", " + numberOfForkers);
    getRepos(numberOfRepos, numberOfForkers, org);
}

async function getRepos(n, m, organization) {

    clear();

    for (let x = 1; x <= Math.floor(n/100); x++){
        const user_url = `https://api.github.com/search/repositories?q=user:\"${organization}\"&page=${x}&sort=forks&order=desc&per_page=100`
        response = await fetch(user_url)
        // console.log("fetched")
        result = await response.json()

        console.log(result)

        const repoResult = document.getElementById("repoResult")
        
        for (let i = 0; i < 100; i++){    

            const repoElement = document.createElement("div");
            repoResult.appendChild(repoElement);

            const anchor = document.createElement("a");
            anchor.href = result.items[i].html_url;
            anchor.textContent = result.items[i].full_name;
            repoElement.appendChild(anchor);

            var button = document.createElement("button");
            button.innerHTML = "Fetch Forks";
            repoElement.appendChild(button);
            button.addEventListener ("click", function() {
                getOldestForks(result.items[i], m, repoElement);
            });

            repoElement.appendChild(document.createElement("br"));
            
        }
    }
    const user_url = `https://api.github.com/search/repositories?q=user:\"${organization}\"&page=${Math.floor(n/100)+1}&sort=forks&order=desc&per_page=100`
    response = await fetch(user_url)
    result = await response.json()

    console.log(result)

    const repoResult = document.getElementById("repoResult")
    
    for (let i = 0; i < n%100; i++){    

        const repoElement = document.createElement("div");
        repoResult.appendChild(repoElement);

        const anchor = document.createElement("a");
        anchor.href = result.items[i].html_url;
        anchor.textContent = result.items[i].full_name;
        repoElement.appendChild(anchor);

        var button = document.createElement("button");
        button.innerHTML = "Fetch Forks";
        repoElement.appendChild(button);
        button.addEventListener ("click", function() {
            getOldestForks(result.items[i], m, repoElement);
        });

        repoElement.appendChild(document.createElement("br"));
        // getOldestForks(result.items[i], m, repoElement);
    }
}

function clear() {
    while (repoResult.firstChild) {
        repoResult.removeChild(repoResult.firstChild)   
    }
}

async function getOldestForks(repo, m, repoElement) {
    const urll = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/forks?q=repo:${repo.name}&sort=oldest`
    console.log(urll);
    let responsee = await fetch(urll)
    resultt = await responsee.json()

    console.log(resultt);
    const ol = document.createElement("ol");
    for (let i = 0; i < m; i++){
        ol.innerHTML += `<li><a href = ${resultt[i].owner.html_url}>${resultt[i].owner.login}</a></li>`
    }
    
    repoElement.appendChild(ol);
    return resultt
}

async function greet() {
    alert("Hello World!");
}
