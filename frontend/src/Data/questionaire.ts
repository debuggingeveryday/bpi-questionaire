// @ts-nocheck

import { initialize, getQuestionaire, updateQuestionaire, migrateFresh } from '../Data/index'

initialize()

export const getAllQuestionaire: any = getQuestionaire()

/* -- find by id -- */
export const findById = (id: number) => {
  return getAllQuestionaire.find((item: any) => item.id === id) || {}
}

/* -- answer -- */
export const answerQuestionaire = (id: any, value: boolean) => {
  if (!id) throw "no value"

  let newData: any = findById(parseInt(id))
  
  newData.answer = value
  newData.isDirty = true

  newData = [...new Set([newData, ...getAllQuestionaire])].sort((a, b) => a.id - b.id)
  
  updateQuestionaire(newData)
}

///* -- Status -- */
export const statusQuestionaire = (statusData) => {
  let total = statusData.length
  let countAnswered = statusData.filter(item => item.isDirty === true).length

  return {
    total,
    countAnswered
  }
}

export const resetQuestionaire = () => {
  migrateFresh()
}
