import crypto from 'crypto'

const getRequestToken = () => {
    return fetch('oauth/requesttoken')
        .then(response => response.json())
        .then(data => data.RequestToken)
}

export const GetAccessToken = async (pubKey: string, privKey: string) => {
    const requestToken = await getRequestToken()

    const concatString: string = requestToken + privKey
    const sha1 = crypto.createHash('sha1')

    sha1.update(concatString)
    const password = sha1.digest('hex')

    return fetch(`oauth/accesstoken?oauth_token=${requestToken}&grant_type=api&username=${pubKey}&password=${password}`)
        .then(response => response.json())
        .then(data => data.AccessToken)
}