export interface ISingleResponse<T> {
  data: T;
  success: boolean;
  timestamp: number;
}

export interface IMultipleResponse<T> {
  data: T[];
  metadata: IMetadata;
  success: boolean;
  timestamp: number;
}

export interface IMetadata {
  page: number;
  pageSize: number;
  total: number;
  totalPage: number;
}

export interface ApiError {
  error: {
    message: string;
    field: Record<string, string>;
    status: number;
  };
  success: boolean;
  timestamp: number;
}

export interface IMetadata {
  page: number;
  pageSize: number;
  total: number;
  totalPage: number;
}

export interface IPagination {
  page: number;
  pageSize: number;
  keyword?: string;
}
