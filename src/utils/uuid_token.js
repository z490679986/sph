import { v4 as uuidv4 } from 'uuid'
// import {nanoid} from 'nanoid'

// 要生成一个随机字符串 且每次执行不能发生改变  游客身份永久存储
export const getUUID = () => {
  // 先从本地存储中看有没有uuid
  let uuid_token = localStorage.getItem('UUIDTOKEN')
  // 如果没有 生成uuid
  if(!uuid_token){
    uuid_token = uuidv4()
    // uuid_token = nanoid()
    // 存储
    localStorage.setItem('UUIDTOKEN',uuid_token)
  }
  return uuid_token
}