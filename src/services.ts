import axios from 'axios'

const getPropertyValues = async (query: any) => {
    try {
        return await axios.post("https://data.ssb.no/api/v0/en/table/05963", query)
    } catch (error) {
        throw Error
    }
}

export { getPropertyValues }