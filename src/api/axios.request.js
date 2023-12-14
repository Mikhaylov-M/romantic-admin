import axios from 'axios'

export const url = "http://91.186.196.161:3001"

export const axiosGet = async ( path, params, headers ) => {
	const paramsString = params ? `?${Object.entries(params).reduce((_acc, [key, value]) => `${_acc}${key}=${value}` ,"")}` : ""
	const { data } = await axios(`${url}${path}${paramsString}`, { headers: headers })
	return data
}