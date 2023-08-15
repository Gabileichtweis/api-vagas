import { CacheRepository } from '../../../shared/database/repositories/cache.repository';
import { UsecaseResponse } from '../../../shared/util/response.adapter';
import { Result } from '../../../shared/util/result.contract';
import { Usecase } from '../../../shared/util/usecase.contract';
import { JobRepository } from '../repositories/job.repository';

interface listCandidatesJob {
  idRecruiter: string;
  idJob: string;
}

export class ListCandidatesJob implements Usecase {
  public async execute(params: listCandidatesJob): Promise<Result> {
    // busca lista de vaga pela cache.
    const cacheRepository = new CacheRepository();
    const cacheResult = await cacheRepository.get(`candidate-${params.idJob}`);

    if (cacheResult) {
      return {
        ok: true,
        code: 200,
        message:
          'Candidates from the Job application successfully listed (cache!)',
        data: cacheResult,
      };
    }

    // 1 - buscar a vaga pelo id => repository
    const repository = new JobRepository();
    const result = await repository.getById(params.idJob);

    if (!result) {
      return UsecaseResponse.notFound('Job');
    }

    // 2 - verificar se essa vaga pertence a recrutador logado

    // 3 - caso não pertença retornar erro
    if (result.job.idRecruiter !== params.idRecruiter) {
      return UsecaseResponse.unauthorized();
    }

    await cacheRepository.set(`candidate-${params.idJob}`, result);

    // 4 - retornar vaga com os candidatos
    return {
      ok: true,
      code: 200,
      message: 'Candidates from the Job application successfully listed',
      data: result,
    };
  }
}
