/* eslint-disable prettier/prettier */
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import InMemoryQuestionsRepository from 'test/repositories/in-memory-questions-repository'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { makeQuestion } from '../../enterprise/entities/factories/make-question'
import { makeAnswer } from '../../enterprise/entities/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'
import { QuestionAttachmentsRepository } from '../repositories/question-attachments-repository'
import { AnswerAttachmentsRepository } from '../repositories/answer-attachments-repository'

let questionAttachmentsRepository: QuestionAttachmentsRepository
let answerAttachmentsRepository: AnswerAttachmentsRepository
let inMemoryQuestionRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose question best Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository(answerAttachmentsRepository)
    inMemoryQuestionRepository = new InMemoryQuestionsRepository(questionAttachmentsRepository)
    sut = new ChooseQuestionBestAnswerUseCase(inMemoryAnswersRepository, inMemoryQuestionRepository)
  })
  it('should be able to choose the question best answer', async () => {
    const question = makeQuestion()

    const answer = makeAnswer({
      questionId: question.id
    })
    
    await inMemoryQuestionRepository.create(question)
    await inMemoryAnswersRepository.create(answer)
    
    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString()
    })
    expect(inMemoryQuestionRepository.items[0].bestAnswerId).toEqual(answer.id)
  })

  it('should not be able to choose another question best answer', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityID('author-1')
    })

    const answer = makeAnswer({
      questionId: question.id
    })

    await inMemoryQuestionRepository.create(question)
    await inMemoryAnswersRepository.create(answer)
    const result = await sut.execute({
      answerId: answer.id.toString(),
      authorId: 'author-2'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
