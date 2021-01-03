const core = async () => {
    let apiKey = localStorage.getItem('todoist_api_key');

    if (apiKey === null) {
        const storeApiKeyActivator = document.getElementById('store-api-key');
        storeApiKeyActivator.addEventListener('click', () => {
            const apiKeyInput = document.getElementById('api-key');

            localStorage.setItem('todoist_api_key', apiKeyInput.value);
        });
    } else {
        const apiKeyEntryElement = document.getElementById('api-key-entry');
        apiKeyEntryElement.parentNode.removeChild(apiKeyEntryElement);

        const projects = JSON.parse(localStorage.getItem('todoist_projects'));
        console.log(projects);

        projects.forEach((project) => {
            const projectSpace = document.createElement('div');
            projectSpace.id = project.id;
            const header = document.createElement('h2');
            header.appendChild(document.createTextNode(project.name));
            projectSpace.appendChild(header);
            document.getElementById('todoish').appendChild(projectSpace);
        });

        projects.forEach((project) => {
            getTodoistData(apiKey, 'tasks', {'project_id': project.id}).then((data) => {
                const newList = document.createElement('ul');
                data.forEach((task) => {
                    const listItem = document.createElement('li');
                    listItem.appendChild(document.createTextNode(task.content));
                    newList.appendChild(listItem);
                });

                document.getElementById(project.id).appendChild(newList);
            });
        });
    }
}

const getTodoistData = (apiKey, uri, params) => {
    const queryString = Object.keys(params).map((key) => {
        return `${key}=${params[key]}`;
    });

    let requestUrl = `https://api.todoist.com/rest/v1/${uri}`;
    if (queryString.length > 0) {
        requestUrl = requestUrl + '?' + queryString.join('&');
    }

    return new Promise((success) => {
        fetch(requestUrl, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        }).then(response =>
            response.json().then(data => ({
                    data: data,
                    status: response.status
                })
            ).then(res => {
                success(res.data);
            })
        );
    });
}

export default core;
