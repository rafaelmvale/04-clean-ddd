/* eslint-disable prettier/prettier */
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answer-repository'

interface FetchRecentQuestionsUseCaseRequest {
  questionId: string
  page: number
}

interface FetchQuestionAnswersUseCaseResponse {
  answers: Answer[]
}

export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    questionId,
    page,
  }: FetchRecentQuestionsUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers =  await this.answersRepository.findManyByQuestionId(questionId,{page})


    return {
      answers,
    }
  }
}
