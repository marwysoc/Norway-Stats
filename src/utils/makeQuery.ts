
import { quarterSet } from '../consts'
import { query } from '../api/queryString'

const makeQuery: (a: string, b: string, c: string) => any = (start, end, houseType) => {
    const startIndex: number = quarterSet.indexOf(start)
    const endIndex: number = quarterSet.indexOf(end)

    query.query[3].selection.values = quarterSet.slice(startIndex, endIndex + 1)
    query.query[1].selection.values[0] = houseType

    return { query }
}

export { makeQuery }