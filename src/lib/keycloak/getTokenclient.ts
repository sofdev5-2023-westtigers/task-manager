export function getTokenClient() {
  return fetch('http://localhost:8080/realms/myrealm/protocol/openid-connect/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      'client_id': 'backendclient',
      'client_secret': 'NujuIpefzpZL46n8pdMch05VUddPxfYI',
      'grant_type': 'client_credentials'
    })
  })
    .then(response => response.json())
    .catch(error => console.error(error))
}