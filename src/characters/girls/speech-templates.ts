import { Any } from 'ts-toolbelt'
import { random } from 'lodash'

export type Feelings = Any.KnownKeys<typeof thoughts>

const textReplacementSymbol = '__subject__'

function toSentence(
  strings: TemplateStringsArray,
  template: string | undefined,
) {
  return (replacement: string) =>
    `${
      template
        ? template?.replaceAll(textReplacementSymbol, replacement)
        : strings
    }`
}

const thoughts = {
  likes: [
    `I'm totally into ${textReplacementSymbol}`,
    `I really like ${textReplacementSymbol}`,
    `I dig ${textReplacementSymbol}`,
  ].map((s) => toSentence`${s}`),
  love: [
    `I loooove ${textReplacementSymbol}, dont you?`,
    `I am so in love with ${textReplacementSymbol}`,
    `I'm crazy about ${textReplacementSymbol}`,
  ].map((s) => toSentence`${s}`),
  dislike: [
    `I don't care much about ${textReplacementSymbol}`,
    `Really, you like ${textReplacementSymbol} ? oooo-kay`,
    `I'm not that into ${textReplacementSymbol}`,
    `${textReplacementSymbol}. No. Just No.`,
  ].map((s) => toSentence`${s}`),
  hate: [
    `I so hate ${textReplacementSymbol}. I dont know why`,
    `I can't stand ${textReplacementSymbol}`,
    `Nothing upsets me more than ${textReplacementSymbol}`,
  ].map((s) => toSentence`${s}`),
  chitchat: [
    `How do you like this place?`,
    `What do you think the meaning of love is?`,
    `I forgot, tell me where you grew up again?`,
    `Are you listening to me?`,
    `Oh, the coffee is so bad here!!`,
    `How do you like this place?`,
    `What do you think the meaning of love is?`,
    `I forgot, tell me where you grew up again?`,
    `Are you listening to me?`,
    `Oh, the coffee is so bad here!!`,
    `How do you like this place?`,
    `What do you think the meaning of love is?`,
    `I forgot, tell me where you grew up again?`,
    `Are you listening to me?`,
    `Oh, the coffee is so bad here!!`,
    `How do you like this place?`,
    `What do you think the meaning of love is?`,
    `I forgot, tell me where you grew up again?`,
    `Are you listening to me?`,
    `Oh, the coffee is so bad here!!`,
    `How do you like this place?`,
    `What do you think the meaning of love is?`,
    `I forgot, tell me where you grew up again?`,
    `Are you listening to me?`,
    `Oh, the coffee is so bad here!!`,
    `How do you like this place?`,
    `What do you think the meaning of love is?`,
    `I forgot, tell me where you grew up again?`,
    `Are you listening to me?`,
    `Oh, the coffee is so bad here!!`,
    `How do you like this place?`,
    `What do you think the meaning of love is?`,
    `I forgot, tell me where you grew up again?`,
    `Are you listening to me?`,
    `Oh, the coffee is so bad here!!`,
  ].map((s) => toSentence`${s}`),
}

export const feelings = Object.keys(thoughts) as Feelings[]

export const talk = (subject: string, feelingsOnSubject: Feelings) => {
  const availableSentences = thoughts[feelingsOnSubject]
  const randomChoice = random(availableSentences.length - 1)

  return availableSentences[randomChoice](subject)
}
