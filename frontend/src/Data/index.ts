// TODO: change this to sqlite

/* -- MIGRATION -- */

import QUESTIONAIRES from '../constants/questionaire'

/* TODO: restructure and remove DRY */

export const loadQuestionaire = () => {
  return QUESTIONAIRES.map((value: string, index: number) => {
    return {
      id: index + 1,
      questions: value,
      isDirty: false,
      answer: false
    }
  })
}

export const initialize = () => {
    if (!localStorage.getItem("questionaire"))
      localStorage.setItem("questionaire", JSON.stringify(loadQuestionaire()))
}

export const migrateFresh = () => {
  localStorage.clear()
  localStorage.setItem("questionaire", JSON.stringify(loadQuestionaire()))

  return true
}

export const getQuestionaire = () => {
  let data = JSON.parse(localStorage.getItem("questionaire") || '{}')
  return data
}

export const updateQuestionaire = (data: any) => {
  localStorage.setItem("questionaire", JSON.stringify(data))
}

