import { DataGenerator } from '../generator.data';

export class DescModel {
  b2cDescription: string;

  b2cTarget: string;

  b2cResult: string;

  b2cLandingUrl: string;

  b2cUrl: string;

  b2cPrice: string;

  b2cPriority: string;

  b2cIsPublic: boolean;

  b2bDescription: string;

  b2bTarget: string;

  b2bResult: string;

  b2bLandingUrl: string;

  b2bPrice: string;

  b2bPriority: string;

  b2bIsPublic: boolean;

  constructor(desc: {
    b2cDescription?: string;
    b2cTarget?: string;
    b2cResult?: string;
    b2cUrl?: string;
    b2cLandingUrl?: string;
    b2cPrice?: string;
    b2cPriority?: string;
    b2cIsPublic?: boolean;
    b2bDescription?: string;
    b2bTarget?: string;
    b2bResult?: string;
    b2bLandingUrl?: string;
    b2bPrice?: string;
    b2bPriority?: string;
    b2bIsPublic?: boolean;
  }) {
    const generator = new DataGenerator();
    this.b2cDescription = desc.b2cDescription ? desc.b2cDescription : generator.paragraph();
    this.b2cTarget = desc.b2cTarget ? desc.b2cTarget : generator.paragraph();
    this.b2cResult = desc.b2cResult ? desc.b2cResult : generator.paragraph();
    this.b2cUrl = desc.b2cUrl ? desc.b2cUrl : generator.url();
    this.b2cLandingUrl = desc.b2cLandingUrl ? desc.b2cLandingUrl : generator.url();
    this.b2cPrice = desc.b2cPrice ? desc.b2cPrice : generator.numberStr(7);
    this.b2cPriority = desc.b2cPriority ? desc.b2cPriority : generator.numberStr(5);
    this.b2cIsPublic = !!desc.b2cIsPublic;
    this.b2bDescription = desc.b2bDescription ? desc.b2bDescription : generator.paragraph();
    this.b2bTarget = desc.b2bTarget ? desc.b2bTarget : generator.paragraph();
    this.b2bResult = desc.b2bResult ? desc.b2bResult : generator.paragraph();
    this.b2bLandingUrl = desc.b2bLandingUrl ? desc.b2bLandingUrl : generator.url();
    this.b2bPrice = desc.b2bPrice ? desc.b2bPrice : generator.numberStr(7);
    this.b2bPriority = desc.b2bPriority ? desc.b2bPriority : generator.numberStr(5);
    this.b2bIsPublic = !!desc.b2bIsPublic;
  }
}
