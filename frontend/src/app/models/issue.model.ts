export class Issue {

  constructor(_id: number = null,
              title: string = '',
              responsible: string = '',
              description: string = '',
              severity: string = '',
              status: string = '') { }

  _id: string;

  title: string;

  responsible: string;

  description: string;

  severity: string;

  status: string;
}
