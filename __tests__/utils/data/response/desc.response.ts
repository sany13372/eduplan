import { DescAnswer } from '../enum/desc.answer.enum';
import { DescModel } from '../model/desc.model';

export class DescResponse {
  static getEduPlanCard(answer: DescAnswer, model: DescModel): string | unknown {
    switch (answer) {
      default:
        return null;
      case DescAnswer.WITHOUT_SITTINGS:
        return { data: { getEduPlanCard0: null } };
      case DescAnswer.BOTH:
        return {
          data: {
            getEduPlanCard0: {
              b2bIsPublic: model.b2bIsPublic,
              b2bPriority: model.b2bPriority,
              b2bCost: `${model.b2bPrice}`,
              b2bResult: `${model.b2bResult}`,
              b2bParticipant: `${model.b2bTarget}`,
              b2bDescription: `${model.b2bDescription}`,
              b2bLandingUrl: `${model.b2bLandingUrl}`,
              b2cIsPublic: model.b2cIsPublic,
              b2cPriority: model.b2cPriority,
              b2cSite: `${model.b2cUrl}`,
              b2cCost: `${model.b2cPrice}`,
              b2cResult: `${model.b2cResult}`,
              b2cParticipant: `${model.b2cTarget}`,
              b2cDescription: `${model.b2cDescription}`,
              b2cLandingUrl: `${model.b2cLandingUrl}`,
            },
          },
        };
      case DescAnswer.B2C:
        return {
          data: {
            getEduPlanCard0: {
              b2bIsPublic: false,
              b2bPriority: null,
              b2bCost: '',
              b2bResult: '',
              b2bParticipant: '',
              b2bDescription: '',
              b2bLandingUrl: '',
              b2cIsPublic: model.b2cIsPublic,
              b2cPriority: model.b2cPriority,
              b2cSite: `${model.b2cUrl}`,
              b2cCost: `${model.b2cPrice}`,
              b2cResult: `${model.b2cResult}`,
              b2cParticipant: `${model.b2cTarget}`,
              b2cDescription: `${model.b2cDescription}`,
              b2cLandingUrl: `${model.b2cLandingUrl}`,
            },
          },
        };
      case DescAnswer.B2B:
        return {
          data: {
            getEduPlanCard0: {
              b2bIsPublic: model.b2bIsPublic,
              b2bPriority: model.b2bPriority,
              b2bCost: `${model.b2bPrice}`,
              b2bResult: `${model.b2bResult}`,
              b2bParticipant: `${model.b2bTarget}`,
              b2bDescription: `${model.b2bDescription}`,
              b2bLandingUrl: `${model.b2bLandingUrl}`,
              b2cIsPublic: false,
              b2cPriority: null,
              b2cSite: '',
              b2cCost: '',
              b2cResult: '',
              b2cParticipant: '',
              b2cDescription: '',
              b2cLandingUrl: '',
            },
          },
        };
      case DescAnswer.ONLY_REQUIRED:
        return {
          data: {
            getEduPlanCard0: {
              b2bIsPublic: model.b2bIsPublic,
              b2bPriority: null,
              b2bCost: '',
              b2bResult: '',
              b2bParticipant: '',
              b2bDescription: '',
              b2bLandingUrl: null,
              b2cIsPublic: model.b2cIsPublic,
              b2cPriority: null,
              b2cSite: '',
              b2cCost: '',
              b2cResult: '',
              b2cParticipant: '',
              b2cDescription: '',
              b2cLandingUrl: null,
            },
          },
        };
    }
  }

  static setEduPlanCard(): string | unknown {
    return { data: { setEduPlanCard0: { id: 'epl_card_2N2qA4qJDjzSrMjfeb3QPDmXehH' } } };
  }
}
