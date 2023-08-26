import { useState } from "react"

interface HistorySearch { 
    id: number,
    text: string
    time: number | Date
}

let id = 0

export const useHistorySearch = () => {
    const [listHistorySearch, setListHistorySearch] = useState<Array<HistorySearch>>([])

    const addHistorySearch = (text: string) => { 
        const time = new Date().getTime()
        const newHistorySearch = {text, time, id: id }
        id++
        setListHistorySearch([newHistorySearch, ...listHistorySearch])
    }

    const removeHistorySearch = (id: number) => { 
        const newListHistorySearch = listHistorySearch.filter(item => item.id !== id)
        setListHistorySearch(newListHistorySearch)
    }

    return {listHistorySearch, addHistorySearch, removeHistorySearch}
}