//const QUESTIONAIRES = [
//'It\'s easy for me to keep fit and healthy.',
//'My present situation is hopeless.',
//'I care about what other people think of me.',
//'Sometimes I feel like smashing things.',
//'I would enjoy betting on horses.',
//'No one is making things work out badly for me.',
//'I feel frightened when I have to go out alone.',
//'I never have visions in which imaginary people or things appear.',
//'Many times I act without thinking.',
//'I enjoy being with people.',
//'I have given up hope of ever amounting to anything.',
//'I frequently think of the same silly thing over and over for hours.',
//'Sometimes my legs lose their strength so that I can\'t walk.',
//'I rarely feel disappointed.',
//'Very few things excite me.',
//'I would never intentionally hurt someone\'s feelings.',
//'For the most part people are honest.',
//'Someone has stolen my free will.',
//'Even at the end of a hard day, I remain relaxed and at ease.',
//'I seem to hear an unknown voice wherever I go.',
//'I would not do something foolhardy just for the fun of it.',
//'I keep my distance from other people.',
//'I deserve my share of good luck.',
//'There have been days when I have done things without being able to recall anything at all about them.',
//'I am free of aches and pains.',
//'There is not much to be interested in anymore.',
//'Some movies make me quite happy or sad.',
//'No one gets away with insulting me.',
//'I have been in trouble with the law more than once.',
//'I rarely feel that someone is trying to get the best of me.',
//'Although I really try, I cannot stop feeling tense.',
//'I do not experience peculiar voices warning me of danger.',
//'I often behave in a reckless manner.',
//'I like to speak to strangers.',
//'I am only suited for the lowest and most simple sort of work.',
//'I sometimes have fits and seizures that I cannot control.',
//'My stomach is easily upset.',
//'My future is cheery.',
//'I would not be tempted by a promise of getting something for nothing.',
//'I can get along quite well with irritable people.',
//'No matter how easy or safe it was, I would never steal money.',
//'Ican tell that someone has searched through my possessions a number of times.',
//'I remain quite cool when things go badly.',
//'Fancy colored lights sometimes float through my brain.',
//'Ideas do not race through my head faster than I can speak them.',
//'Most of the time I prefer to be alone.',
//'I am the type of person who can be relied upon.',
//'I don\'t think my life is worth living.',
//'I seldom have any bodily discomfort.',
//'I live a gloomy and boring life.',
//'At times I say things about my friends that aren\'t nice.',
//'If someone does something I dislike, I usually tell that person about it.',
//'I would enjoy cheating certain people.',
//'I never have the feeling that someone is out to do away with me.',
//'It frightens me to think about things that bother me.',
//'Ordinary things never appear "foggy" or far away to me.',
//'Sometimes I suddenly get up and act without warning or reason.',
//'I would rather work with a group of people than by myself.',
//'I am no good to anyone.',
//'I have nightmares almost every night.',
//'My skin is often red and inflamed.',
//'I enjoy just about everything I do.',
//'I never weep or feel like weeping.',
//'I don\'t mind having someone tell me what to do.',
//'I know of no excuse for taking advantage of someone of the opposite sex.',
//'I feel that I am in great danger from those who wish to harm me.',
//'Other people\'s actions rarely make me anxious.',
//'I sometimes hear voices which no one else understands.',
//'I am careful in almost everything I do.',
//'I try not to get involved in conversations with others.',
//'I think my parents would have reason to be proud of me.',
//'I have strange fears of places and things.',
//'My back does not bother me.',
//'Others seem to lead happier lives than I do.',
//'I can remember a few unpleasant things about my childhood.',
//'Slow people make me angry.',
//];

/* TODO: restructure and remove DRY */

/* -- MIGRATION -- */
const QUESTIONAIRES = [
  "one",
  "two",
  "three"
]

export const loadQuestionaire = () => {
  return QUESTIONAIRES.map((value, index) => {
    return {
      id: index + 1,
      questions: value,
      isDirty: false,
      answer: false
    }
  })
}

const STATUS = {
  total: 0,
  countAnswered: 0
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
