import Router from 'next/router'

export const fetchRequest = {
  fetcherSWR,
  get,
  post,
  put,
  delete: _delete,
}

const API_URL: string = process.env.WEB_API_URL!

async function fetcherSWR(url: string, ...args: any) {
  const res = await fetch(API_URL + url, args)

  if (!res.ok) {
    let error = new Error('An error occurred while fetching the data.')

    if ([401, 403].includes(res.status)) {
      Router.replace('/auth/login?visited=' + window.location.href)
      throw error
    }
  }

  return res.json()
}

function get(url: string) {
  const requestOptions: any = {
    method: 'GET',
  }
  return fetch(API_URL + url, requestOptions).then(handleResponse)
}

function post(url: string, body: any) {
  const requestOptions: any = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }
  return fetch(API_URL + url, requestOptions).then(handleResponse)
}

function put(url: string, body: any) {
  const requestOptions: any = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }
  return fetch(API_URL, requestOptions).then(handleResponse)
}

function _delete(url: string) {
  const requestOptions: any = {
    method: 'DELETE',
  }
  return fetch(API_URL, requestOptions).then(handleResponse)
}

function handleResponse(res: any) {
  return res.text().then((text: any) => {
    const data = text && JSON.parse(text)

    if (!res.ok) {
      if ([401, 403].includes(res.status)) {
        // logout
        Router.replace('/auth/login?visited=' + window.location.href)
      }

      const error = data || res.statusText
      return Promise.reject(error)
    }

    return data
  })
}
