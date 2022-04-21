import HttpError from '$lib/HttpError'

export async function getAccessToken(fetch) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "email": import.meta.env.VITE_EMAIL,
      "password": import.meta.env.VITE_PASSWORD,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    const response = await fetch("https://portal.wearefyi.dev/auth/login", requestOptions)
    const result = await response.json()

    if (response.ok) {
        return result
    } else {
        throw new HttpError(response, "Could not retrieve access token from CMS.")
    }
}

export async function getJobsCount(fetch, token, url) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const response = await fetch(url, requestOptions)
    const result = await response.json()

    if (response.ok) {
        return result
    } else {
        throw new HttpError(response, "Could not retrieve jobs from CMS.")
    }
}
