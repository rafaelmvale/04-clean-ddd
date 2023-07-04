import { GetquestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from '../../enterprise/entities/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import InMemoryQuestionsRepository from 'test/repositories/in-memory-questions-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetquestionBySlugUseCase

describe('Get Question By SLug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetquestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('example-question'),
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      slug: 'example-question',
    })
    expect(result.value?.question.id).toBeTruthy()
    expect(result.value?.question.title).toEqual(newQuestion.title)
  })
})
