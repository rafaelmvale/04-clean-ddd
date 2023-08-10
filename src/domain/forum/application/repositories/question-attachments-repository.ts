import { QuestionAttachment } from '../../enterprise/entities/question-attachment'

export interface QuestionAttachmentsRepository {
  findManyByQuestionId(answerId: string): Promise<QuestionAttachment[]>
  deleteManyQuestionById(questionId: string): Promise<void>
}
