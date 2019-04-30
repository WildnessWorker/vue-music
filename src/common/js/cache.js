import storage from 'good-storage'

const SEARCH_KEY = '__search__';  //搜索数据的key
const SEARCH_MAX_LENGTH = 15; //搜索记录最大存储条数

//搜索记录去重，并排序
function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if(index === 0) {
    return
  }

  if(index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if(maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

export function saveSearch(query) {
  let searchs = storage.get(SEARCH_KEY, []);
  insertArray(searchs, query, (item) => {
    return item === query
  }, SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY, searchs);
  return searchs
}

export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

