export const fetchRequest = {
  get,
  post,
  // put,
  // delete: _delete,
}

const URL: string = process.env.WEB_API_URL!

function get(url: string) {
  const requestOptions: any = {
    method: 'GET',
  }
  return fetch(URL + url, requestOptions).then(handleResponse)
}

function post(url: string, body: any) {
  const requestOptions: any = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }
  return fetch(URL + url, requestOptions).then(handleResponse)
}

function handleResponse(response: any) {
  return response.text().then((text: any) => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      // if ([401, 403].includes(response.status)) {
      //   // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      //  // userService.logout()
      // }

      const error = data || response.statusText

      return Promise.reject(error)
    }

    return data
  })
}
