import { UniversitiesResponse } from 'src/app/model/universities/universities.model';
export class Careers {
}

export class CareersResponse{
    public ID_CAREERS !: number;
    public ID_UNIVERSITIES !: number;
    public ID_INTELLIGENSE !: number;
    public CAREERS !: String;
}


export class CareersModel{
    public CAREERS !: CareersResponse;
    public UNIVERSITIES: UniversitiesResponse[] = [];
}
