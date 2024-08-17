import { initialize, getQuestionaire, updateQuestionaire, migrateFresh } from '../Data/index'

initialize()

export const getAllQuestionaire: any = getQuestionaire()

/* -- find by id -- */
export const findById = (id: number) => {
  return getAllQuestionaire.find((item: any) => item.id === id) || {}
}

/* -- answer -- */
export const answerQuestionaire = (id: number, value: boolean) => {
  if (!id) throw "no value"

  let newData: any = findById(id)
  
  newData.answer = value
  newData.isDirty = true

  newData = [...new Set([newData, ...getAllQuestionaire])].sort((a, b) => a.id - b.id)
  
  updateQuestionaire(newData)
}

///* -- Status -- */

interface IQuestionaires {
  id: number;
  questions: string;
  answer: boolean;
  isDirty: boolean;
  length: number;
  filter: any;
}

export const statusQuestionaire = (statusData: IQuestionaires) => {
  let total = statusData.length
  let countAnswered = statusData.filter((item: IQuestionaires) => item.isDirty === true).length

  return {
    total,
    countAnswered
  }
}

export const resetQuestionaire = () => {
  migrateFresh()
}
