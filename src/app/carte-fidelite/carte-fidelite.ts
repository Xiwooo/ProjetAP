import { DatePipe } from "@angular/common";

export interface Task {
    id?: string;
    prenom: string;
    nom: string;
    point : number;
    dernierPassage : string;
    email : string;
  }