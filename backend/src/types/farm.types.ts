export interface CreateFarmDTO {
    name: string;
    location: string;
    acreage: number;
    description?: string;
    managerId: number;
  }
  
  export interface UpdateFarmDTO {
    name?: string;
    location?: string;
    acreage?: number;
    description?: string;
    managerId?: number;
  }
  